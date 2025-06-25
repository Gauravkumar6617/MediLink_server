
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const ConnectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to mongo db")
        
    } catch (error) {
        console.log("error durring establishing connection",error);
        process.exit(1);
        
    }
}
export default ConnectDb;
