var express = require('express');
var compression	= require('compression');
var path = require('path');
var mongoose = require("mongoose");
var bodyParser = require('body-parser'); // deprecated!!!
var _ = require('lodash');

var app = express();

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  //res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Auth-Token');
  if ('OPTIONS' == req.method) return res.sendStatus(200);
  next();
});

//MongoDB configuration
mongoose.connect('mongodb://localhost/myfpbuilder', function(err, res) {
	if(err){
		console.log('error connecting to MongoDB Database. ' + err);
	} else {
		console.log('Connected to Database');
	};
});

var builder = require('./builder/routes/builder');

app.use(compression());
app.use(bodyParser.json());

/**
 * Development Settings
 */

if (app.get('env') === 'development' || app.get('env') === 'production') {
	console.log('mode: development');
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	// app.use(express.static(path.join(__dirname, '../client/.tmp'), { maxAge: 0 }));
	app.use(express.static(path.join(__dirname, '../client/dist'), { maxAge: 0 }));

	// Error Handling
	app.use(function(err, req, res, next) {

		res.status(err.status || 500);

		res.send(err);

		//res.render('error', {
		//	message: err.message,
		//	error: err
		//});

	});
}

var oneDay = 86400000;

/**
 * Production Settings
 */
if (app.get('env') === 'production') {
	console.log('mode: production');

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '../client/dist'), { maxAge: oneDay }));

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

app.use('/builder', builder);

module.exports = app;
