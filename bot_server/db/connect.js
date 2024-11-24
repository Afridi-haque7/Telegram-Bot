import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log('Connected to MongoDB');
        
    } catch (error) {
        console.error('Failed to connect to DB: ' + error);
        
    }
}

export default connectDB;