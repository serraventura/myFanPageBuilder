var express = require('express');
var compression	= require('compression');
var path = require('path');
var mongoose = require("mongoose");
var bodyParser = require('body-parser'); // deprecated!!!
var _ = require('lodash');

var builder = require('./builder/routes/builder');
var cronJob = require('./classes/Template');

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

app.use(compression());
app.use(bodyParser.json());

/**
 * Development Settings
 */

if (app.get('env') === 'development') {
	console.log('mode: development');
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	// app.use(express.static(path.join(__dirname, '../client/.tmp'), { maxAge: 0 }));
	// app.use(express.static(path.join(__dirname, '../dist'), { maxAge: 0 }));
	app.use('/', express.static(path.join(__dirname, '..'), { maxAge: oneDay }));

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
	app.use(express.static(path.join(__dirname, '../dist'), { maxAge: oneDay }));

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
app.use('/imageTemplates', express.static(__dirname + '/_engine/myFanPage/dist/src/webcontent/views/templates/'));
//app.use('/templates', express.static(__dirname + '/_engine/myFanPage/dist/'));
app.use('/templates', express.static(__dirname + '/live-pages/', {
	etag: false,
	maxage: 0,
	dotfiles: 'deny',
	setHeaders: function(res, path) {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
	}
}));

cronJob.getNewTemplates().start();

module.exports = app;
