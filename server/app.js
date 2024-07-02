import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoute from "./route/authRoute.js";
import postRoute from "./route/postRoute.js";
import userRoute from "./route/userRoute.js";


const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config()


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/auth');
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        })
    } catch (e) {

    }
}


start()