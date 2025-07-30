import mongoose from "mongoose";


const connectDB = async () =>{
    try {
await mongoose.connect(process.env.MONGODB_URL || "");
console.log("MongoDB connected")
    } catch(error){
console.error("MongoDB connected error", error)

    }
}

export default connectDB;