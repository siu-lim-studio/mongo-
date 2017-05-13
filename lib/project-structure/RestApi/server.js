/**
 * This module is an express data server :
 * you can get it at : http://localhost:8080/api
 * @module       : Server
 * @author       : Jean luc deshayes
 *  
 *
 */
//===========================================================
// BASIC SETUP
//https:
//scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var db = require('./app/config/db.js');
var routing = require('./app/router/index.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
    // middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

routing(router, db);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;