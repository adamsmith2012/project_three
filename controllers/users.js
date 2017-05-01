//==============================
// USER CONTROLLER
//==============================

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

// NEW
// router.get('/new', function(req, res) {
//   res.render('users/new.ejs');
// });

// CREATE
/**
 * Creates a new user and adds it to the database
 * POST data: user model
 * Response: user model
 */
router.post('/', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser) {
    res.json(createdUser);
  })
});

// UPDATE
/**
 * Updates a user's name and image
 * URL params: user model id
 * POST data: user model
 * Response: user model
 */
router.put('/:id', function(req, res) {
  var data = {
    name: req.body.name,
    image: req.body.image
  }
  User.findByIdAndUpdate(req.params.id, data, {new:true},
    function(err, updatedUser) {
      res.json(updatedUser);
    });
});

module.exports = router;
