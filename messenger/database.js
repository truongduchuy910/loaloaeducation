var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    psid: String,
    first_name: String,
    last_name: String,
    profile_pic: String
});
module.exports = mongoose.model('messenger', userSchema); 
