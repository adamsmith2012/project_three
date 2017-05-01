//==============================
// USER MODEL
//==============================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  name: {type: String, required: true},
  image: String,
  username: {type: String, required: true},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
