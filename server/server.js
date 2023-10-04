const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbConfig'); // Importing DB Config

// Importing routes
const authRoutes = require('./routes/authRoutes');
const giftRoutes = require('./routes/giftRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Config
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB(); // Utilizing DB Config

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Deployment config for serving front-end build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
