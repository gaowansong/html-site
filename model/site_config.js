/*
* @author junmo
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../utils/db.js');

var SiteSchema = mongoose.Schema({
    configName: {type: String},
    configJson: {type: String}
});


var site = mongoose.model('newSite', SiteSchema)
module.exports = site;