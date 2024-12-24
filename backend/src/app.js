import express from "express";
import cors from 'cors';
import userRouter from "./router/Router.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // React frontend URL
    methods: ['GET', 'POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow sending cookies with requests
  }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//cookie
app.use(cookieParser());


app.use('/api/v1/user', userRouter);


export default app;

