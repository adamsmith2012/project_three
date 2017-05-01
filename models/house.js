//==============================
// HOUSE MODEL
//==============================
var mongoose = require('mongoose'); // npm install mongoose --save

var houseSchema = mongoose.Schema({
  name: {String, required: true, unique: true}
  img: String,
  region: String
});

var House = mongoose.model('House', houseSchema);

module.exports = House;
