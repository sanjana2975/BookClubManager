import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

export const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        // Add: Success message with connection details
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        // Add: Log the actual error
        console.error(`Error: ${error.message}`);
        console.log("Error Connecting to DB!");
        process.exit(1); //status code error 1 exit with failure
    }
};