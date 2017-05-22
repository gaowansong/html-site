/*
* @author junmo
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../utils/db.js');

var ArticleSchema = mongoose.Schema({
	site_name: {type: String},
    title: {type: String},
    site_url: {type: String, unique: true},
    content: {type: String},
    list: {type: Array},
    c_time: {type: Date, default:new Date()},

});


ArticleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'article_id', 
    startAt: 1,
    incrementBy: 1
});

var Article = mongoose.model('newArticle', ArticleSchema)
module.exports = Article;