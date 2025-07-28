import express from 'express'
import { Router } from 'express'
import { Comment } from '../models/commentSchema.js'
import { verifyGoogleToken } from '../auth/googleverifytokn.js';
import { User } from '../models/userSchema.js';
import {v4 as uuid4} from 'uuid'
import { findSession, sessionStore } from '../auth/sessionstore.js';

export const authRouter = Router();


function tomorrowDate(){
    let today = new Date();
    today.setDate(today.getDate()+1)
    return today;
}

authRouter.use((req,res,next)=>{
    console.log("request recieved",req.method,req.originalUrl);
    next();
})

authRouter.post('/signup',async function(req,res){
    console.log("signup requested");
    let userDetails = req.body;

    let decodedUser = await verifyGoogleToken(userDetails.idToken);
    
    // need to get google credentials when signing up 

    let newUser = new User({
        name:decodedUser.name,
        email:decodedUser.email,
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

    let decodedUser = await verifyGoogleToken(req.body.idToken);
    let existingUser;
    try{
        let allUsers = await User.find();
        console.log(allUsers)
        existingUser = await User.findOne({
                            email:decodedUser.email
                        })
        console.log(existingUser,decodedUser.email);
        if(existingUser){
            // create a session id and store it / in redis /
            let expiryTimeSession = new Date(Date.now()+24*60*60*1000);
            let storeInSession = {
                name:existingUser.name,
                role:existingUser.role,
                email:existingUser.email,
                sessionId:uuid4(),
                expiry:tomorrowDate()
            }
            
            //we also need to send user data ?
            sessionStore.push(storeInSession);

            res.cookie('sessionId',storeInSession.sessionId,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'none',secure:true});

            res.send("Login success");

        }else{
            return res.status(403).send("There is no existing account with given credentials.Sign-up for an account and then login")
        }
    }catch(err){
        console.log("error when tring to check if email already exists",err);
    }
})
