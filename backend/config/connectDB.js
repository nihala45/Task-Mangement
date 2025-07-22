import mongoose from 'mongoose'
import dotenv from 'dotenv'



dotenv.config()
const mongodbUrl = process.env.MONGODB_URL
export const connectDB = async()=> {
    try{
        await mongoose.connect(mongodbUrl)
        console.log('mongodb connected')
    }catch(error){
        console.log(error)
    }
}