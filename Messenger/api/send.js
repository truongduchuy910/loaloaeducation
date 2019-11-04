var request = require('request')
var config = require('../config')
module.exports = {
    create_label: function (psid, label, callback) {
        request(
            {
                uri: "https://graph.facebook.com/v2.11/me/custom_labels",
                qs: {
                    access_token: config.access_token
                },
                method: "POST",
                json: {
                    name: label
                }
            },
            (err, res, body) => {
                callback(err, body);
            }
        )
    },
 
