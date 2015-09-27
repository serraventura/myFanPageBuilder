var express = require('express');
var router = express.Router();

var builderController = require('../controllers/builder');

router.get('/signup', function(req, res) {

    builderController.signup(req, res);

});

module.exports = router;
