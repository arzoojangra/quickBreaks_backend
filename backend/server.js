// Importing dependencies
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const mongoose = require('mongoose');
const customResponse = require('./utils/customResponse');

// Loading environment variables
dotenv.config();

const app = express();

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
app.use(routes)

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
  customResponse.getGenericResponse(res, req, 404, null, "Sorry unable to find this page!", "Wrong URL");
});