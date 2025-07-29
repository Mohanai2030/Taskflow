import { Router } from 'express'
import { User } from '../models/userSchema.js'
import { managerValidator, sessionDetailGetter, userValidator } from '../middleware/rolegetter.js';
import { Project } from '../models/projectSchema.js';

export const userRouter = Router();

userRouter.use(sessionDetailGetter)

userRouter.get('/employees',managerValidator,async function(req,res){
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

userRouter.get('/projects',userValidator,async function(req,res){
    try{
        let projectIds = await User.findById(req.session._id).select({project:1,_id:0})
        let projects = await Project.find({
            _id:{$in:projectIds}
        }).select({name:1})
        return res.send(projects)
    }catch(err){
        console.log("Error when trying to get projects of a user");
        return res.status(500).send("Server error");
    }
})

