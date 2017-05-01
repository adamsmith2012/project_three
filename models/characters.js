//==============================
// CHARACTER MODEL
//==============================

/****** REQUIRED MODELS ******/
var mongoose = require('mongoose');

/****** CHARACTER SCHEMA ******/
var charSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  img: String,
  region: String
});

/****** DB COLLECTION CREATION ******/
var Char = mongoose.model('Char', charSchema);

module.exports = Char;
