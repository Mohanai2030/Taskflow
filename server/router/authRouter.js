import express from 'express'
import { Router } from 'express'
import { Comment } from '../models/commentSchema.js'

export const authRouter = Router();

authRouter.post('/signup',async function(req,res){
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

authRouter.post('/login',async function(req,res){
    console.log("login requested")
    console.log(req.body)
})