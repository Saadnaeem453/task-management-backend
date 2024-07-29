import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();

const dbConnect = async ():Promise<void>=> {
    try {
        const mongoURI = process.env.MONGODB_URI
        if(!mongoURI){
            throw new Error("MONGO_URI is not defined in the environment variables")
        }
     await mongoose.connect(mongoURI);
                console.log("MOngoDb is connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
   

}