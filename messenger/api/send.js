
https://developers.facebook.com/docs/messenger-platform/reference/send-apivar request = require('request')
var request = require('request')
var config = require('../config')
module.exports = {
    send: function (psid, text, callback) {
        request(
            {
                uri: "https://graph.facebook.com/v5.0/me/messages",
                qs: {
                    access_token: config.access_token
                },
                method: "POST",
                json: {
                    messaging_type: 'RESPONSE',
                    recipient: {
                        id: psid
                    },
                    message: {
                        text: text
                    }
                }
            },
            (err, res, body) => {
                callback(err, body);
            }
        )
    },
}

