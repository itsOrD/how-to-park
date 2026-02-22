const { validationResult } = require('express-validator');
const Model = require('../models/park.js');

const save = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const parkingSpot = req.body;
  console.log('save the following: ', parkingSpot);
  Model.Park.create(parkingSpot, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Spot saved!');
      res.sendStatus(201);
    }
  });
};

const getAll = (_req, res) => {
  return Model.Park.find({})
    .then(spots => res.status(200).json(spots))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  save,
  getAll,
};
