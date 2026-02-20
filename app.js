import express from 'express';
import cors from "cors";
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'

const app = express();

dotenv.config({ path: 'config/config.env' })

// ✅ ADD THIS CORS MIDDLEWARE (VERY IMPORTANT)
app.use(cors({
    origin: "https://ecommerce-frontend-deploy-1qsn.onrender.com",
    credentials: true
}));

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Backend deployed successfully"
    });
});

// Routes
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

app.use(errorHandleMiddleware)

export default app;