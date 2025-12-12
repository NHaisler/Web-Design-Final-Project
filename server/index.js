require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    "https://web-design-final-project.onrender.com"
  ],
  credentials: true
})); 
app.use(express.json()); // Allows us to parse JSON bodies

// Routes
app.use('/api', apiRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});