import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db/connect.js';
import router from './route/user.route.js'


const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON body

// Connection to Database
connectDB();

// API routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);  
});