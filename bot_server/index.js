import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db/connect.js';
import userRouter from "./route/user.route.js";
import botRouter from "./bot/bot.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON body

// Connection to Database
connectDB();

// API routes
app.use("/", userRouter);
app.use("/bot", botRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);  
});