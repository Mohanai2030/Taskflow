import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

export let connectDB = async function(){
    try{
        await mongoose.connect(process.env.CONNECTION_URI)
    }catch(err){
        console.log("Error connecting to database: ",err)
    }
}
