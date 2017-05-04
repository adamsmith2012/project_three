//==============================
// HOUSE MODEL
//==============================
var mongoose = require('mongoose'); // npm install mongoose --save

var Character = require('./characters.js');

var houseSchema = mongoose.Schema({
  name: {type: String, required: true},
  img: String,
  region: String,
  characters: [Character.schema]
});

var House = mongoose.model('House', houseSchema);

module.exports = House;
