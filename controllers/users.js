var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

// NEW
router.get('/new', function(req, res) {
  res.render('users/new.ejs');
});

// CREATE
router.post('/', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser) {
    res.redirect('/');
  })
});

module.exports = router;
