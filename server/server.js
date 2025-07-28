// import { connectDB } from "./DB/dbconn";
import { connectDB } from "./DB/dbconn.js";
import { User } from "./models/userSchema.js";
import {projectSchema, Project} from "./models/projectSchema.js"
import mongoose, { mongo } from "mongoose";
import express from 'express';
import { Task } from "./models/taskSchema.js";
import { Comment } from "./models/commentSchema.js";
import { projectRouter } from "./router/projectRouter.js";
import { taskRouter } from "./router/taskRouter.js";
import { commentRouter } from "./router/userRouter.js";
import { userRouter } from "./router/commentRouter.js";
import { authRouter } from "./router/authRouter.js";

const app = express();

app.use('auth',authRouter);

app.use('/user',userRouter);

app.use('/project',projectRouter);

app.use('/task',taskRouter);

app.use('/comment',commentRouter);

app.listen(3000,async ()=>{
    console.log("server running");
    await connectDB();
})


