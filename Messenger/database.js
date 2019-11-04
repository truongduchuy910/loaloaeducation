var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    psid: String,
    classes: Array,
    labels: Array
});
module.exports = mongoose.model('messenger', userSchema); 