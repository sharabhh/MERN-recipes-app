import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import {userRouter} from './src/routes/users.js'
import { recipesRouter } from "./src/routes/recipes.js";
dotenv.config()

const app = express()
const mongoUrl =process.env.MONGO_URL
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter); 

mongoose.connect(mongoUrl)

app.listen(3001, ()=>{
    console.log('Server Started')
})