var mongoose = require('mongoose');
module.exports = {
    sender: mongoose.model('sender', mongoose.Schema({
        psid: String,
        first_name: String,
        last_name: String,
        profile_pic: String
    })),
    broadcast: mongoose.model('broadcast', mongoose.Schema({
        user: String,
        broadcast_id: String,
        message_creative_id: String
    }))
}
