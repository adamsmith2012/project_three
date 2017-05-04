//==============================
// CHARACTER CONTROLLER
//==============================

/****** REQUIRED MODELS ******/
var express = require('express');
var router = express.Router();
var Char = require('../models/characters.js');
var House = require('../models/house.js');
var User = require('../models/users.js');

/****** GET ROUTES ******/
router.get('/', function(req, res){
    Char.find({}, function(err, foundChars){
        res.json(foundChars);
    });

});

/****** PUT/POST ROUTES ******/
router.post('/', function(req, res){
    var data = {
      name: req.body.name,
      img: req.body.img,
      title: req.body.title,
      house: req.body.house,
      books: req.body.books,
      stat: req.body.stat
    }
    User.findById(req.session.currentUser._id, function(err, foundUser) {
      House.findById(req.body.houseId, function(err, foundHouse){
        Char.create(data, function(err, createdChar){
          if(createdChar) {
            foundHouse.characters.push(createdChar);
            foundHouse.save(function(err, data){
              foundUser.houses.id(req.body.houseId).remove();
              foundUser.houses.push(foundHouse);
              foundUser.save(function(err, data) {
                res.json(createdChar);
              })
            });
          } else {
            res.json();
          }
        });
      });
    });
});

router.put('/:id', function(req, res){
    //-----find this guy-
    //---------------------update it to this
    //---------------------------------callback gets updated model
    //----------------------------------------------------------callback function
    Char.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedChar){
        if(err){
            res.json(err);
        }
        res.json(updatedChar);
    });
});

/****** DELETE ROUTES ******/
router.delete('/:id', function(req, res){
  User.findById(req.session.currentUser._id, function(err, foundUser) {
    Char.findByIdAndRemove(req.params.id, function(err, deletedChar){
      House.findOne({ 'characters._id' : req.params.id }, function(err, foundHouse) {
        foundHouse.characters.id(req.params.id).remove();
        foundHouse.save(function(err, savedHouse) {
          foundUser.houses.id(foundHouse._id).remove();
          foundUser.houses.push(foundHouse);
          foundUser.save(function(err, data) {
            res.json(deletedChar);
          });
        });
      });
    });
  });
});

module.exports = router;
