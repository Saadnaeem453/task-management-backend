import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/db';

import userRoutes from "./routes/user.route"
import taskRoutes from "./routes/task.route"

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
dbConnect();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

