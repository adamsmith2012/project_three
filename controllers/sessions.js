var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

// NEW
router.get('/new', function(req, res) {
  res.render('sessions/new.ejs');
});

// CREATE
router.post('/', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, foundUser) {
    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
        res.redirect('/sessions/new');
      }
    } else {
      res.redirect('/sessions/new');
    }
  });
});

// DELETE
router.delete('/', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

module.exports = router;
