var express = require('express');
var router = express.Router();
var site_config = require('../model/site_config.js'); 
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	site_config.find({}, function(err, data){
        if (data) {
        	res.render('index', {
				list: data,
		        wsport: PORTS[1],
		        item: "站点管理"
			});
        }
    });
	
});

module.exports = router;