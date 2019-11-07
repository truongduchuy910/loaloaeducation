//Tất cả, và chỉ những tao thác liên quan tới request đến Facebook sẽ được đặt ở đây

var request = require('request')
var config = require('../config')
module.exports = {
    creating_broadcast_messages: function (messages, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/me/message_creatives",
            qs: { access_token: config.access_token },
            method: "POST",
            json: {
                messages: messages
            }
        }, (err, res, body) => {
            callback(err, body);

        });
    },
    sending_broadcast_messages_with_labe: function (message_creative_id, custom_label_id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/me/broadcast_messages",
            qs: { access_token: config.access_token },
            method: "POST",
            json: {
                message_creative_id: message_creative_id,
                custom_label_id: custom_label_id,
                notification_type: "REGULAR",

            }
        }, (err, res, body) => {
            callback(err, body);
        });
    },
    sending_broadcast_messages: function (message_creative_id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/me/broadcast_messages",
            qs: { access_token: config.access_token },
            method: "POST",
            json: {
                message_creative_id: message_creative_id,
                notification_type: "REGULAR",
                messaging_type: "MESSAGE_TAG",
                tag: "NON_PROMOTIONAL_SUBSCRIPTION"

            }
        }, (err, res, body) => {
            callback(err, body);
        });
    }
}