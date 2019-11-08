
https://developers.facebook.com/docs/messenger-platform/reference/send-apivar request = require('request')
var request = require('request')
var config = require('../config')
module.exports = {
    message: function (psid, message) {
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
                    message: message
                }
            },
            (err, res, body) => {
                console.log('message ', psid, ': ', err, body.data);
            }
        )
    },
}

