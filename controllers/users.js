//==============================
// USER CONTROLLER
//==============================

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/users.js');
var House = require('../models/house.js');

// GET
/**
 * Returns all users in database
 */
router.get('/', function(req, res) {
  User.find({}, function(err, foundUsers) {
    res.json(foundUsers);
  });
});

/**
 * Returns specific user
 */
 router.get('/:id', function(req, res) {
   User.findById(req.params.id, function(err, foundUser) {
     res.json(foundUser);
   });
 });

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
  if(req.session.currentUser && req.session.currentUser._id == req.params.id) {
    var data = {
      name: req.body.name,
      image: req.body.image
    }
    User.findByIdAndUpdate(req.params.id, data, {new:true},
      function(err, updatedUser) {
        res.json(updatedUser);
      });
  } else {
    res.json();
  }
});

// DELETE
/**
 * Deletes a user and associated houses
 * URL params: user model id
 */
router.delete('/:id', function(req, res) {
  if(req.session.currentUser && req.session.currentUser._id == req.params.id) {
    User.findByIdAndRemove(req.params.id, function(err, foundUser) {
      var houseIds = [];

      for (var i=0; i < foundUser.houses.length; i++) {
        houseIds.push(foundUser.houses[i]._id);
      }

      House.remove(
        {
          _id: {
            $in: houseIds
          }
        }, function(err, data) {
          res.json(foundUser);
        }
      )
    });
  } else {
    res.json();
  }
});

module.exports = router;
