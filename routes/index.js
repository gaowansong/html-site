var fs = require('fs');
var filelist = require(ROOT + 'lib/file-list.js');
var article = require('../model/article.js'); 
var moment = require('moment');
var mongoose = require('mongoose');


exports.route = function () {
    routes.get('/', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        console.log('configsName',configsName);
        // site_config.find({}, function(err, data){
        //     if (true) {}
        // });
        this.views('index', {
            list: configsName,
            wsport: PORTS[1]
        });
    });
    routes.get('/crawler', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        this.views('index', {
            list: configsName,
            wsport: PORTS[1]
        });
    });
    routes.get('/tag', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        this.views('spider', {
            item: "tag管理",
        });
    });
    routes.get('/hot', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        this.views('spider', {
            item: "热点类别",
        });
    });
    routes.get('/news', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        var that = this;
        var list_new = [];
        article.find({}, function(err, result){
        	if (result) {
        		result.forEach(function(e){
        			list_new.push({
        				title: e.title,
        				c_time: moment(e.c_time).format('L'),
        				article_id: e.article_id
        			});
        		})
        		that.views('new_list', {
		            item: "新闻标注",
		            list_new: list_new
		        });
        	}
        })
        
    });
    routes.get('/news/:id', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        var articleId = mongoose.Types.ObjectId(req.params.id);
        var that = this;
        article.findOne({article_id: articleId}, function(err, result){
        	if (result) {
        		console.log('result',result);
        		that.views('article_content', {
		            item: "新闻标注"
		        });
        	}
        })
        
    });
    routes.get('/user', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        this.views('spider', {
            item: "用户管理",
        });
    });
    routes.get('/list', function (req, res) {
        var configsName = filelist(ROOT + 'config');
        this.views('spider', {
            item: "分类标记任务",
        });
    });
}