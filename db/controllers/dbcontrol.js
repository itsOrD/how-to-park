const Model = require('../models/park.js');

const save = (req, res) => {
  let parkingSpot = req.body;
  console.log('save the following: ', parkingSpot);
  Model.Park.create(parkingSpot, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Spot saved!');
      res.sendStatus(201);
    }
  })
}

module.exports = {
	save
};
