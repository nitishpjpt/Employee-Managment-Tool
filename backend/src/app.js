import express from "express";
import cors from 'cors';
import userRouter from "./router/Router.js";


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // React frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use('/api/v1/user', userRouter);


export default app;

