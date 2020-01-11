const db = require('../index.js');

const NAMESchema = mongoose.Schema({
  // name: String
  // added: {
  //   type: Date,
  //   default: Date.now
  // },
});

const NAME = mongoose.model('NAME', NAMESchema);

module.exports = NAMEschema;
