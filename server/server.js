// import { connectDB } from "./DB/dbconn";
import { connectDB } from "./DB/dbconn.js";
import express from 'express';
import { projectRouter } from "./router/projectRouter.js";
import { taskRouter } from "./router/taskRouter.js";
import { commentRouter } from "./router/commentRouter.js";
import { userRouter } from "./router/userRouter.js";
import { authRouter } from "./router/authRouter.js";

const app = express();

app.use(()=>{
    console.log("request recieved")
})

app.use('/auth',authRouter);

app.use('/user',userRouter);

app.use('/project',projectRouter);

app.use('/task',taskRouter);

app.use('/comment',commentRouter);

app.listen(3000,async ()=>{
    console.log("server running");
    await connectDB();
})


