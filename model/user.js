/*
* @author junmo
 */
var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
	user_id: {type: Number},
    user_name: {type: String},
    passport: {type: String},
    email: {type: String},
    phone: {type: Number}
});

var User = mongoose.model('newusers', UserSchema)
module.exports = User;