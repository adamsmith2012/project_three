//==============================
// CHARACTER CONTROLLER
//==============================

/****** REQUIRED MODELS ******/
var express = require('express');
var router = express.Router();
var Char = require('../models/characters.js');

/****** GET ROUTES ******/
router.get('/', function(req, res){
    Char.find({}, function(err, foundChars){
        res.json(foundChars);
    });

});

/****** PUT/POST ROUTES ******/
router.post('/', function(req, res){
    Char.create(req.body, function(err, createdChar){
        if(err){
            res.json(err);
        }
        res.json(createdChar);
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
    Char.findByIdAndRemove(req.params.id, function(err, deletedChar){
        if(err){
            res.json(err);
        }
        res.json(deletedChar);
    });
});

module.exports = router;
