import mongoose from "mongoose";

const connectDB = async () => {
 
    console.log("connecting to the MongoDB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected Successfully!");
  
};

export default connectDB;
