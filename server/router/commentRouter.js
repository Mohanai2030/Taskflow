import express from 'express'
import { Router } from 'express'
import { Comment } from '../models/commentSchema.js'
import { sessionDetailGetter, userValidator } from '../middleware/rolegetter.js';

export const commentRouter = Router();

commentRouter.post('/',sessionDetailGetter,userValidator,async function (req,res){
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

commentRouter.get('/',sessionDetailGetter,userValidator,async function(req,res){

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
        
})