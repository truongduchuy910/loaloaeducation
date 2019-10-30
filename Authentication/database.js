var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    messenger: {
        PSID: String
    }
});
module.exports = mongoose.model('user', userSchema); 