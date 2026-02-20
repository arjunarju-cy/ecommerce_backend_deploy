import mongoose from "mongoose";

export const connectMongoDatabase = () => {
    if (!process.env.DB_URI) {
        console.log("Error: DB_URI is not defined in environment variables.");
        process.exit(1);
    }
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`MongoDB connected with server ${data.connection.host}`);
    }).catch((err) => {
        console.log(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    });
}
