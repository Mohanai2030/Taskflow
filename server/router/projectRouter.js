import express from 'express'
import { Router } from 'express'
import { Project } from '../models/projectSchema.js';
import { User } from '../models/userSchema.js';

export const projectRouter = Router();

// projectRouter.get('/',async function(req,res){
//     let userId = req.query.userId;
//     try{
//         let projects = 
//     }catch(err){
//         console.log("Error in trying to access the projects of a user ",err)
//     }
// })

//only admin allowed
projectRouter.post('/create',async function(req,res){
    let projectDetails = req.body;

    let newProject = new Project({
        name:projectDetails.name,
        description:projectDetails.description
    })
    
    try{
        await Project.save();
        res.status(201).send("Successfully created new project")
    }catch(err){
        console.log("error when trying to create a new project:",err);
        res.send(500);
    }
})

//think about how to store the name of logged in user in frontend,so when showing members we can also show a you indication

projectRouter.get('/members',async function(req,res){
    let projectId = req.query.project;
    try{
        let users = await User.find({
            project:{
                $elemMatch:projectId
            }
        })
        res.send(users)
    }catch(err){
        console.log("error when trying to get all members of a project",err)
    }
})

projectRouter.post('/addmembers',async function(req,res){
    let projectId = req.body.projectId;
    let members = req.body.members;
    
    try{
        let projectMembers = await User.updateMany({
            _id:{$in:members}
        },{
            $set:{
                project:projectId
            }
        });

        if(members.length!=projectMembers.modifiedCount){
            console.log("not all members were assigned to the project",members.length,projectMembers.modifiedCount)
        }else{
            res.status(201).send("Successfully added members to the project")
        }
    }catch(err){
        console.log("error when trying to add projects to employees",err)
    }
})

projectRouter.delete('/members',async function(req,res){
    let projectId = req.query.project;
    let toBeRemovedMembers = req.body.members;

    try{
        let removedProjectsFromUsers = await User.updateMany({
            _id:{$in:toBeRemovedMembers}
        },{
            $pull:{
                project:projectId
            }
        })

        if(removedProjectsFromUsers.modifiedCount==toBeRemovedMembers.length){
            return res.status(200).send("successfully deleted the project from the list of projects of the given members.")
        }else{
            console.log("When trying to delete members of project , mismatch between modifed and expected count", err)
            return 
        }
    }catch(err){
        console.log("error when trying to remove project members")
        return res.status(500).send("try again later")
    }
    
})

projectRouter.put('/',async function (req,res){
    const newProjectToUpdate = req?.body;

    try{
        let updatedProject = await Project.updateOne({
            _id:newProjectToUpdate._id
        },{
            $set:{
                name:newProjectToUpdate?.name,
                description:newProjectToUpdate?.description,
                deadline:newProjectToUpdate?.deadline,
            }
        })

        if(updatedProject.modifiedCount==1){
            return res.status(200).send("Successfully updated the project")
        }else if(updatedProject.modifiedCount==0){
            console.log("no updated project",newProjectToUpdate)
            return res.status(500).send("Try again later with a correct project details")
        }
    }catch(err){
        console.log("error when trying to update project(put)",err)
    }
})

projectRouter.patch('/',async function(req,res){
    let toUpdateProject = req?.body;
    let projectId = req.query?.project;

    let updateObject = {}
    switch(Object.keys(toUpdateProject)[0]){
        case 'name':{
            updateObject = {
                $set:{
                    name:toUpdateProject.name
                }
            }
            break
        }
        case 'description':{
            updateObject = {
                $set:{
                    description:toUpdateProject.description
                }
            }
            break
        }
        case 'deadline':{
            updateObject = {
                $set:{
                    deadline:toUpdateProject.deadline
                }
            }
            break
        }


    }

    try{
        let updatedProject = await Project.updateOne({
            _id:projectId
        },updateObject)

        if(updatedProject.modifiedCount==1){
            return res.status(200).send("Successfully updated the project")
        }else if(updatedProject.modifiedCount==0){
            console.log("no updated project",newProjectToUpdate)
            return res.status(500).send("Try again later with a correct project details")
        }
    }catch(err){
        console.log("error when trying to update project(put)",err)
    }
    
})

projectRouter.delete('/',async function(req,res){
    let projectId = req.query.project;

    //definitely there is a need for promise.all

    //first remove all the references from projects field of users documents
    await User.updateMany({
        project:{
            $elemMatch:projectId
        }
    },{
        $pull:{
            project:projectId
        } 
    })

    let deletedProject = await Project.deleteOne({
        _id:projectId
    })

    if(deletedProject.deletedCount==1){
        res.send("Successfully deleted the project")
    }else{
        res.status(500).send("Retry later")
    }
})

