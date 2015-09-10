var express = require('express');
var router = express.Router();

var builderController = require('../controllers/builder');

router.get('/search', function(req, res) {

    builderController.doSearch(req, res);

});

module.exports = router;
