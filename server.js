var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/****** MODELS ******/

var House = require('./models/house.js');

// Heroku / Localhost setup

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/got'

/****** MIDDLEWARE ******/

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

/****** CONTROLLERS ******/

var charController = require('./controllers/chracters.js');
app.use('/chracters', controller);
// var controller = require('./controllers/{file}.js');
// app.use('/{url}', ontroller);
var houseController = require('./controllers/house.js');
app.use('/houses', houseController);


mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function() {
  console.log("Connected to mongo");
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
