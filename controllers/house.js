//==============================
// HOUSE CONTROLLER
//==============================
var express = require('express');
var router = express.Router();
var House = require('../models/house.js');
var User = require('../models/users.js');

// INDEX ROUTE | See all houses
router.get('/', function(req, res) {
  House.find({}, function(err, foundHouses) {
    res.json(foundHouses);
  });
});

// POST CREATE ROUTE
router.post('/', function(req, res) {
  User.findById(req.session.currentUser._id, function(err, foundUser) {
    House.create(req.body, function(err, createdHouse) {
      if(createdHouse) { // check to see if new house was created
        foundUser.houses.push(createdHouse);
        foundUser.save(function(err, data) {
          res.json(createdHouse);
        });
      } else {
        res.json();
      }
    });
  })
});

// PUT | UPDATE ROUTE
router.put('/:id', function(req, res) {
  House.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedHouse) {
    User.findById(req.session.currentUser._id, function(err, foundUser) {
      foundUser.houses.id(req.params.id).remove();
      foundUser.houses.push(updatedHouse);
      foundUser.save(function(err, data) {
        res.json(updatedHouse);
      });
    });
  });
});

// DELETE ROUTE
router.delete('/:id', function(req, res) {
  House.findByIdAndRemove(req.params.id, function(err, deletedHouse) {
    User.findById(req.session.currentUser._id, function(err, foundUser) {
      foundUser.houses.id(req.params.id).remove();
      foundUser.save(function(err, data) {
        res.json(deletedHouse);
      });
    });
  });
});


module.exports = router;
