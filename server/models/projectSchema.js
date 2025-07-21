import mongoose from 'mongoose'

const {Schema,model} = mongoose;

const projectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

export const Project = model('Project',projectSchema);

