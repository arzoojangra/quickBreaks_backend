// Importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes.js';
import customResponse from './utils/customResponse.js';
import cors from 'cors';

// Loading environment variables
dotenv.config();

const app = express();

app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Middlewares to parse JSON requests
app.use(express.json());

// using routes
app.use('/api', routes);

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
  customResponse.sendGenericResponse(req, res, 404, null, "Sorry unable to find this page!", "Wrong URL");
});