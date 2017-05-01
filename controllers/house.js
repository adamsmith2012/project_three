//==============================
// HOUSE CONTROLLER
//==============================
var express = require('express');
var router = express.Router();
var House = require('../models/house.js');

// INDEX ROUTE | See all houses
router.get('/', function(req, res) {
  House.find({}, function(err, foundHouses) {
    res.json(foundHouses);
  });
});

// POST CREATE ROUTE
router.post('/', function(req, res) {
  House.create(req.body, function(err, createdHouse) {
    res.json(createdHouse);
  });
});

// PUT | UPDATE ROUTE
router.put('/:id', function(req, res) {
//                        find this guy
//                                     update this guy
//                                               callback gets updated model
//                                                            callback function
  House.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedHouse) {
    res.json(updatedHouse);
  });
});

// DELETE ROUTE
router.delete('/:id', function(req, res) {
  House.findByIdAndRemove(req.params.id, function(err, deletedHouse) {
    res.json(deletedHouse);
  });
});


module.exports = router;
