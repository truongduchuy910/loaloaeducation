var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    psid: String,
    classes: String,
    labels: Array,
    first_name: String,
    last_name: String,
    profile_pic: String
});
module.exports = mongoose.model('messenger', userSchema); 
