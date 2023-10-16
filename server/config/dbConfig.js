const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    console.log('Attempting to retrieve MONGO_URI:');
    console.log('MONGO_URI:', process.env.MONGO_URI);

    // Log all env variables if necessary (ensure not to expose sensitive data)
    // console.log('All Env Variables:', process.env);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options can be added here as needed
    };

    await mongoose.connect(process.env.MONGO_URI, options);

    console.log("Database Connected Successfully");
  } catch(err) {
    console.error("Database Connection Error: ", err);
    process.exit(1); // Terminate the process if connection fails
  }
};

module.exports = connectDB;

