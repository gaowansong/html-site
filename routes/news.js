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
router.get('/:site', function (req, res) {
    // var configsName = filelist(ROOT + 'config');
    var site = req.params.site;
    var that = this;
    var list_new = [];
    var site_name = [];
    article.find({
        site_name: site
    }, function(err, result){
    	if (result) {
    		result.forEach(function(e){
                site_name.push(e.site_name);
    			list_new.push({
    				title: e.title,
    				c_time: moment(e.c_time).format('L'),
    				_id: e._id
    			});
    		})
            // console.log(site_name.unique());
    		res.render('new_list', {
	            list_new: list_new,
                item: "内容列表"
	        });
    	}
    })
});

router.get('/site/:id', function (req, res) {
    // var configsName = filelist(ROOT + 'config');
    var _id = mongoose.Types.ObjectId(req.params.id);
    var that = this;
    article.findOne({_id: _id}, function(err, result){
    	if (result) {
    		res.render('article_content', {
	            content: result,
                item: "文章详情"
	        });
    	}
    })
    
});


module.exports = router;