// import { connectDB } from "./DB/dbconn";
import { connectDB } from "./DB/dbconn.js";
import express from 'express';
import { projectRouter } from "./router/projectRouter.js";
import { taskRouter } from "./router/taskRouter.js";
import { commentRouter } from "./router/commentRouter.js";
import { userRouter } from "./router/userRouter.js";
import { authRouter } from "./router/authRouter.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { redisCheck, redisClient, redisConnect } from "./DB/redisconn.js";


const app = express();


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(bodyParser.json());

app.use(cookieParser())

app.use((req,res,next)=>{
    console.log("request recieved",req.method,req.originalUrl);
    next();
})

app.use('/auth',authRouter);

app.use('/user',userRouter);

app.use('/project',projectRouter);

app.use('/task',taskRouter);

app.use('/comment',commentRouter);

app.listen(3000,async ()=>{
    console.log("server running");
    await connectDB();
    await redisConnect();
    // await redisCheck();
})


