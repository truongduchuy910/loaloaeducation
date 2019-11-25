var request = require('request')
var config = require('../config')
var views = require('../views')
var labels = require('./labels')
var database = require('../database')
module.exports = {
    creating_broadcast: function (messages) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/message_creatives",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    messages: messages
                }
            }, (err, res, body) => {
                console.log('creating_broadcast', err, body)
                resolve(body);
            });
        })
    },
    broadcast_with_label_predicates: function (message_creative_id, custom_label_ids) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast",
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
                console.log('broadcast_with_label', err, body)
                resolve(body);
            });
        })
    },
    broadcast_with_label: function (message_creative_id, custom_label_id) {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    message_creative_id: message_creative_id,
                    notification_type: "REGULAR",
                    custom_label_id: custom_label_id
                }
            }, (err, res, body) => {
                console.log('broadcast_with_label', err, body)
                resolve(body);
            });
        })
    },
    broadcast: function (message_creative_id) {
        return new Promise((resolve, reject) => {

            request({
                uri: "https://graph.facebook.com/v3.3/me/broadcast",
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    message_creative_id: message_creative_id,
                    notification_type: "REGULAR",
                    messaging_type: "MESSAGE_TAG",
                    tag: "NON_PROMOTIONAL_SUBSCRIPTION"

                }
            }, (err, res, body) => {
                console.log('broadcast', err, body)
                resolve(body);
            });
        })
    },
    broadcast_in_website: async function (custom_label_ids, user, text, url) {
        return new Promise(async (resolve, reject) => {
            var content, content_creative_id, content_id
            if (text) {
                content = views.text(`Thẻ ${user} gửi: ${text}`).text;
                content_creative_id = await this.creating_broadcast([content]).message_creative_id;
                if (custom_label_ids.length > 1) {
                    content_id = await this.broadcast_with_label_predicates(message_creative_id, custom_label_ids).broadcast_id
                } else {
                    content_id = await this.broadcast_with_label(message_creative_id, custom_label_ids[0]).broadcast_id

                }
            }
            var attachment, attachment_creative_id, attachment_id
            if (url) {
                attachment = views.attachment(`https://edu.loaloa.me${url}`)
                attachment_creative_id = await this.creating_broadcast([attachment]).message_creative_id
                if (custom_label_ids.length > 1) {
                    attachment_id = await this.broadcast_with_label_predicates(attachment_creative_id, custom_label_ids).broadcast_id
                } else {
                    attachment_id = await this.broadcast_with_label(attachment_creative_id, custom_label_ids[0]).broadcast_id
                }
            }
            var labelsName = await labels.get_labels_by_ids(custom_label_ids)
            database.broadcast.insertMany({
                time: new Date(),
                user: user,
                content: content,
                attachment: attachment,
                content_creative_id: content_creative_id,
                attachment_creative_id: attachment_creative_id,
                content_id: content_id,
                attachment_id: attachment_id,
                labels: labelsName
            }, (err, docs) => {
                console.log('broadcast', err, docs)
                resolve(docs)
            })

        })


    }
}