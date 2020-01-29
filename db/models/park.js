const db = require('../index.js');
const mongoose = require('mongoose');

const parkingSchema = mongoose.Schema({
  carSize: String,
  make: String,
  driverStatus: String,
  timeOfday: String,
  difficulty: Number,
  comments: String
});

const Park = mongoose.model('Park', parkingSchema);

module.exports = {
  Park,
};
