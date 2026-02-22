const db = require('../index.js');
const mongoose = require('mongoose');

const parkingSchema = mongoose.Schema({
  carSize: { type: String, required: true, enum: ['small', 'medium', 'large'] },
  make: { type: String, required: true, maxlength: 100 },
  driverStatus: { type: String, required: true },
  timeOfday: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, maxlength: 500 },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  createdAt: { type: Date, default: Date.now },
});

parkingSchema.index({ location: '2dsphere' });

const Park = mongoose.model('Park', parkingSchema);

module.exports = {
  Park,
};
