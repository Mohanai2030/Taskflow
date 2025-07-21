import mongoose, { mongo } from 'mongoose'
import { Task } from './taskSchema';
const {Schema,model} = mongoose;

const commentSchema = new Schema({
    body:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:new Date()
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Comment = model('Comment',commentSchema);

