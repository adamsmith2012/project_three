//==============================
// HOUSE MODEL
//==============================
var mongoose = require('mongoose'); // npm install mongoose --save

var houseSchema = mongoose.Schema({
  name: String,
  img: String,
});

var House = mongoose.model('House', houseSchema);

module.exports = House;
