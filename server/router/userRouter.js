import express from 'express'
import { Router } from 'express'
import { User } from '../models/taskSchema'

export const userRouter = Router();

userRouter.get('/employees',async function(req,res){
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

userRouter.get('/projects',async function(req,res){
    
})