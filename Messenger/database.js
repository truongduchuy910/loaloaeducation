var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    PSID: String
});
module.exports = mongoose.model('messenger', userSchema); 