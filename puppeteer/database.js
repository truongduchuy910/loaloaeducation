var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    title: String,
    broadcast_id: String
});
module.exports = mongoose.model('puppeteer', userSchema); 
