var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    title: String
});
module.exports = mongoose.model('puppeteer', userSchema); 
