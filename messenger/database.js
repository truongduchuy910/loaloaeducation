var mongoose = require('mongoose');
module.exports = {
    sender: mongoose.model('sender', mongoose.Schema({
        psid: String,
        first_name: String,
        last_name: String,
        profile_pic: String
    })),
    broadcast: mongoose.model('broadcast', mongoose.Schema({
        time: Date,
        user: String,
        content: Object,
        attachment: Object,
        content_creative_id: String,
        attachment_creative_id: String,
        content_id: String,
        attachment_id: String,
        labels: Array
    }))
}
