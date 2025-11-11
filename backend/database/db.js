import mongoose from "mongoose";

const  ConnectToDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log(`We are connected to MONGO_DB`);
       
    } catch (error) {
        console.log("Internal server error");
        
    }
}

export {ConnectToDB};