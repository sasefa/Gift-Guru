const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // or false, depending on your use case

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI || 'your_backup_uri';
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database Connected Successfully");
  } catch(err) {
    console.log("Database Connection Error: ", err);
  }
};

module.exports = connectDB;

