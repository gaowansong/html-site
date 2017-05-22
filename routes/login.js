var express = require('express');
var router = express.Router();
var site_config = require('../model/site_config.js'); 
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	res.render('login', {});
	
});

module.exports = router;