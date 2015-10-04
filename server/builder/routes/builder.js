var express = require('express');
var router = express.Router();

var builderController = require('../controllers/builder');

router.post('/signup', function(req, res) {

    builderController.signup(req, res);

});

router.get('/listtemplates', function(req, res) {

    builderController.listTemplates(req, res);

});

module.exports = router;
