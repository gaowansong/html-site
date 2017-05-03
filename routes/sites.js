var express = require('express');
var router = express.Router();
var filelist = require(ROOT + 'lib/file-list.js');
var article = require('../model/article.js'); 
var moment = require('moment');
var mongoose = require('mongoose');


Array.prototype.unique = function(){
    this.sort(); //先排序
    var res = [this[0]];
    for(var i = 1; i < this.length; i++){
        if(this[i] !== res[res.length - 1]){
           res.push(this[i]);
        }
    }
    return res;
}
router.get('/', function (req, res) {
    // var configsName = filelist(ROOT + 'config');
    var that = this;
    var site_name = [];
    article.find({}, function(err, result){
    	if (result) {
    		result.forEach(function(e){
                site_name.push(e.site_name);
    		})
    		res.render('site_list', {
	            site_name: site_name.unique(),
                item: "站点列表"
	        });
    	}
    })
    
});
module.exports = router;