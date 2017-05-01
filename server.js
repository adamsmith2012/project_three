var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

/****** MODELS ******/

// Heroku / Localhost setup

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/got'

/****** MIDDLEWARE ******/

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: "kungfukenny",
  resave: false,
  saveUninitialized: false
}));

/****** CONTROLLERS ******/

var usersController = require('./controllers/users.js');
app.use('/users', usersController);

var sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

// var charController = require('./controllers/characters.js');
// app.use('/characters', charController);

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function() {
  console.log("Connected to mongo");
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
