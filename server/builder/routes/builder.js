var express = require('express');
var router = express.Router();

var builderController = require('../controllers/builder');

router.post('/signup', function(req, res) {

    builderController.signup(req, res);

});

router.post('/settemplate', function(req, res) {

    builderController.setTemplate(req, res);

});

router.get('/listtemplates', function(req, res) {

    builderController.listTemplates(req, res);

});

router.get('/user', function(req, res) {

    builderController.getUser(req, res);

});

module.exports = router;
