// Import libraries and packages
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

// Import routes
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';

// Configure dotenv
dotenv.config()

// Connect to Mongo database
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch((err) => {
        console.log(err)
    })

// creates an application
const app = express();

// allows json to be input to server
app.use(express.json());

// allows cookie parsing
app.use(cookieParser());

// starts up server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// render all routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


// create a  middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})