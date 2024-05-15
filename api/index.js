import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express(); // creates an application

app.use(express.json()); // allows json to be input to server

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
