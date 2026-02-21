require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/howtopark';

// Connect to MongoDB with error handling
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
}).catch(err => {
  console.log('MongoDB connection error (continuing without DB):', err.message);
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('MongoDB error (app will continue):', err.message);
});

db.once('open', () => console.log('Mongo connection established!'));

module.exports = db;
