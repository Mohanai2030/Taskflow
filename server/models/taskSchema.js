import mongoose from 'mongoose'
const {Schema,model} = mongoose;

const taskSchema = new Schema({
    description:String,
    deadline:Date,
    status:{
        type:String,
        default:"To Do",
        validate:{
            validator: function(s){
                return ["To Do","In Progress","Done"].includes(s)
            }
        }
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    assignedTo:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    }
})

export const Task = model('Task',taskSchema)

