import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//connectDb




const connectOptions: any= {
 
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log("Database connection successfull");
  } catch (error) {
    console.error("Database Connection fail", error);
    process.exit(1);
  }
};
//disconnectDb
export const disconnectDB = async () => {
  try {
    console.log("Database connection close");
    return mongoose.disconnect();
  } catch (error) {
    console.log("Database disconnection error", error);
    process.exit(1);
  }
};

export default {connectDB};
