// import { connectDB } from "./DB/dbconn";
import { connectDB } from "./DB/dbconn.js";
import { User } from "./models/userSchema.js";
import {projectSchema, Project} from "./models/projectSchema.js"
import mongoose, { mongo } from "mongoose";
import express from 'express';
import { Task } from "./models/taskSchema.js";
import { Comment } from "./models/commentSchema.js";

const app = express();

app.post('/signup',async function(req,res){
    let userDetails = req.body;
    
    // need to get google credentials when signing up 

    let newUser = new User({
        name:userDetails.name,
        email:userDetails.email,
        role:userDetails.role
    })

    try{
        await newUser.save();
        res.status(201).send("Successfully created new user")
    }catch(err){
        console.log("error when trying to create new user account:",err,"for the userbody",userDetails)
    }

})

app.get('/employees',async function(req,res){
    try{
        let employees = await User.find({
            role:{$ne:'Manager'}
        }).projection({
            name:1
        });

        return res.send()
    }catch(err){
        console.log("error when trying to get the employees list",err);
        res.send(500);
    }
})

//only admin allowed
app.post('/addproject',async function(req,res){
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

app.post('/addprojectmembers',async function(req,res){
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

app.post('/addtask',async function(req,res){

    let taskBody = req.body.taskBody;

    let newTask = new Task({
        project:taskBody.projectId,
        description:taskBody.description,
        deadline:taskBody.date,
        assignedBy:taskBody.assignedBy,
        assignedTo:taskBody.assignedTo
    })

    try{
        await taskBody.save();
        res.status(201).send("Successfully created new task")
    }catch(err){
        console.log("error when trying to add a task to a project",err)
    }

})

//assume that project can never be updated
app.put('/modifytask',async function(req,res){
    let taskId = req.query.taskId;
    let toUpdateTask = req.query.body;
    
    try{
        let updatedTask = await Task.updateOne({
            _id:taskId
        },{
            $set:{
                project:toUpdateTask.project,
                deadline:toUpdateTask.deadline,
                status:toUpdateTask.status,
                description:toUpdateTask.description,
                assignedBy:toUpdateTask.assignedBy,
                assignedTo:toUpdateTask.assignedTo,
            }
        })
        if(updatedTask.modifiedCount==1){
            return res.status(200).send("successfully updated the project details")
        }else if(updatedTask.modifiedCount==0){
            console.log("no tasks were modified when trying to modify",taskId,toUpdateTask)
            return res.status(500).send("try again later")
        }
    }catch(err){
        console.log("Error when trying to update a task",err)
    }
    
})

app.patch('/modifytask',async function(req,res){

    let taskId = req.query.taskId;
    let toUpdateTask = req.query.body;

    let updateBody;
    //injection prevention check
    switch(Object.keys(toUpdateTask)?.[0]){
        case 'description':{
            updateBody = {
                $set:{
                    description:toUpdateTask.description
                }
            }
            break;
        }
        case 'deadline':{
            updateBody = {
                $set:{
                    deadline:toUpdateTask.deadline
                }
            }
            break;
        }
        case 'status':{
            updateBody = {
                $set:{
                    status:toUpdateTask.status
                }
            }
            break;
        }
        case 'assignedBy':{
            updateBody = {
                $set:{
                    assignedBy:toUpdateTask.assignedBy
                }
            }
            break;
        }
        case 'assignedTo':{
            updateBody = {
                $set:{
                    assignedTo:toUpdateTask.assignedTo
                }
            }
            break;
        }
        default:{
            return res.status(400).send("invalid update statement")
        }
        
    }

    try{
        let updatedTask = await Task.updateOne({
            _id:taskId,
        },updateBody)

        if(updatedTask.modifiedCount==1){
            return res.status(200).send("successfully updated the project details")
        }else if(updatedTask.modifiedCount==0){
            console.log("no tasks were modified when trying to modify",taskId,toUpdateTask)
            return res.status(500).send("try again later")
        }
    }catch(err){

    }
    
})

app.post('/addComent',async function (req,res){
    let comment = req.body.commentBody;   
    let rootComment = req.body.rootComment;

    let newComment;
    if(rootComment){
        newComment = new Comment({
            body:comment.body,
            user:comment.userId
        })
    }else{
        newComment = new Comment({
            body:comment.body,
            parent:comment.parentComment,
            user:comment.userId
        })
    }

    try{
        await newComment.save();
        res.status(201).send("Successfully created new comment")
    }catch(err){
        console.log("Error when trying to add comment ",err)
    }
    
})

app.get('/comment',async function(req,res){

    let taskId = req.query.taskId;
    let rootComment = req.query.rootComment;
    // root level comments 
    if(rootComment){
        try{
            let rootComments = await Comment.find({
                task:taskId,
                parent:null
            })
            return res.send(rootComments)
        }catch(err){
            console.log("error when trying to access rootComments",err)
        }
    }else{
        let parentComment = req.query.parentCommentId;

        try{
            let comments = await Comment.find({
                task:taskId,
                parent:parentComment
            })
        }catch(err){
            console.log("Error when trying to get comments",err)
        }
    }

    // nested comment
    
   
        
})

app.listen(3000,async ()=>{
    console.log("server running");
    await connectDB();
})


