var express = require('express');
var router = express.Router();
var site_config = require('../model/site_config.js'); 
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	site_config.find({}, function(err, data){
        if (data) {
        	res.render('show_index', {
				list: data,
		        item: "主页"
			});
        }
    });
	
});

module.exports = router;