import mongoose from 'mongoose'
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        validate:{
            validator: function(r){
                return ['Data analyst','Software engineer','Site Reliability Engineer','Manager'].includes(r)
            }
        },
        required:true
    },
    project:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Project'
    },
})

export const User = model('User',userSchema)

