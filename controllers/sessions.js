//==============================
// SESSION CONTROLLER
//==============================

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

// CREATE
router.post('/', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, foundUser) {
    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.json(foundUser);
      } else {
        res.json();
      }
    } else {
      res.json();
    }
  });
});

// DELETE
router.delete('/', function(req, res) {
  req.session.destroy(function() {
    res.json();
  });
});

module.exports = router;
