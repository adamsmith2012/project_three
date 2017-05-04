//==============================
// USER MODEL
//==============================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var House = require('./house.js');

var userSchema = Schema({
  name: {type: String, required: true},
  image: {type: String, default: "http://orig00.deviantart.net/1bf2/f/2014/250/0/4/game_of_thrones_png_logo_by_sohrabzia-d7y9g1j.png"},
  houses: [House.schema],
  username: {type: String, required: true},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
