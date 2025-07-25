import express from 'express'
import { Router } from 'express'
import { Task } from '../models/taskSchema.js'
import { Comment } from '../models/commentSchema.js';

export const taskRouter = Router();

taskRouter.post('/',async function(req,res){

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

//need to know when assigned to changes 

//assume that project can never be updated
taskRouter.put('/',async function(req,res){
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

taskRouter.patch('/',async function(req,res){

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

//need to study what ref does 

//need to study about event loop starvation

taskRouter.delete('/',async function(req,res){
    const taskId = req.query.task;
    try{

        await Comment.deleteMany({
            task:taskId
        })
        
        await Task.deleteOne({
            _id:taskId
        })

        return res.status(200).send("Deleted the task successfully");
    }catch(err){
        console.log("error when trying to delete task",err)
    }
})

