var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/****** MODELS ******/

// Heroku / Localhost setup

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/got'

/****** MIDDLEWARE ******/

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

/****** CONTROLLERS ******/

// var controller = require('./controllers/{file}.js');
// app.use('/{url}', ontroller);

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function() {
  console.log("Connected to mongo");
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
