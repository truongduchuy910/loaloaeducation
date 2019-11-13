var request = require('request')
var config = require('../config')
module.exports = {
    creating_broadcast_messages: function (messages) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/message_creatives",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    messages: messages
                }
            }, (err, res, body) => {
                console.log('creating_broadcast_messages', err, body)
                resolve(body);
            });
        })
    },
    sending_broadcast_messages_with_labe_predicates: function (message_creative_id, custom_label_ids) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast_messages",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    message_creative_id: message_creative_id,
                    notification_type: "REGULAR",
                    targeting: {
                        labels: {
                            operator: "OR",
                            values: custom_label_ids
                        }
                    }
                }
            }, (err, res, body) => {
                console.log('sending_broadcast_messages_with_labe', err, body)
                resolve(body);
            });
        })
    },
    sending_broadcast_messages_with_labe: function (message_creative_id, custom_label_id) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast_messages",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    message_creative_id: message_creative_id,
                    notification_type: "REGULAR",
                    custom_label_id: custom_label_id
                }
            }, (err, res, body) => {
                console.log('sending_broadcast_messages_with_labe', err, body)
                resolve(body);
            });
        })
    },
    sending_broadcast_messages: function (message_creative_id) {
        return new Promise((resolve, reject) => {

            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast_messages",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    message_creative_id: message_creative_id,
                    notification_type: "REGULAR",
                    messaging_type: "MESSAGE_TAG",
                    tag: "NON_PROMOTIONAL_SUBSCRIPTION"

                }
            }, (err, res, body) => {
                console.log('sending_broadcast_messages', err, body)
                resolve(body);
            });
        })
    }
}