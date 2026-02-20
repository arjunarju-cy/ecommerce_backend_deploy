import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
connectMongoDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
// Handle uncaught exception errors
process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1);

})

const port = process.env.PORT || 3000;
let razorpayInstance = null;
try {
    razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY || "dummy_key_id",
        key_secret: process.env.RAZORPAY_API_SECRET || "dummy_key_secret",
    });
} catch (error) {
    console.log("Razorpay initialization warning:", error.message);
}
export const instance = razorpayInstance;

const server = app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);

})

process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Promise Rejection Error: ${err.message}`);
    console.log(`Stack trace:`, err.stack);
})