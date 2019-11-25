//https://developers.facebook.com/docs/messenger-platform/identity/custom-labels
var request = require('request')
var config = require('../config')
module.exports = {
    create_label: function (label) {
        return new Promise(async (res, rej) => {
            request(
                {
                    uri: "https://graph.facebook.com/v3.3/me/custom_labels",
                    qs: {
                        access_token: config.access_token
                    },
                    method: "POST",
                    json: {
                        name: label
                    }
                },
                (err, response, body) => {
                    console.log('create_label', err, body)
                    res(body);
                }
            )
        })
    },
    associate_label: function (psid, id) {
        return new Promise(async (res, rej) => {
            request({
                uri: `https://graph.facebook.com/v3.3/${id}/label`,
                qs: { access_token: config.access_token },
                method: "POST",
                json: {
                    user: psid
                }
            }, (err, res, body) => {
                console.log('associate_label', err, body)
                res(body)
            });
        })
    },
    unassociate_label: function (psid, id) {
        return new Promise(async (res, rej) => {

            request({
                uri: `https://graph.facebook.com/v3.3/${id}/label`,
                qs: { access_token: config.access_token },
                method: "DELETE",
                json: {
                    user: psid
                }
            }, (err, response, body) => {
                console.log('unassociate_label', err, body)
                res(body)
            });
        })
    },
    retrieving_labels_by_psid: function (psid) {
        return new Promise(async (res, rej) => {

            request({
                uri: "https://graph.facebook.com/v3.3/" + psid + "/custom_labels",
                qs: {
                    fields: "name",
                    access_token: config.access_token
                },
                method: "GET",
            }, (err, response, body) => {
                console.log('retrieving_labels_by_psid', err, body)
                res(JSON.parse(body))
            });
        })
    },
    get_all_labels: function () {
        return new Promise(async (res, rej) => {
            request({
                uri: "https://graph.facebook.com/v3.3/me/custom_labels",
                qs: {
                    fields: "name",
                    access_token: config.access_token
                },
                method: "GET",
            }, (err, response, body) => {
                console.log('get_all_labels', err, body)
                res(JSON.parse(body))
            });
        })
    },
    get_label_details: function (custom_label_id) {
        return new Promise(async (res, rej) => {
            request({
                uri: "https://graph.facebook.com/v3.3/" + custom_label_id,
                qs: {
                    fields: "name",
                    access_token: config.access_token
                },
                method: "GET",
            }, (err, response, body) => {
                console.log('get_label_details', err, body)
                res(body)
            });
        })
    }
    ,
    delete_label: function (custom_label_id) {
        return new Promise(async (res, rej) => {
            request({
                uri: "https://graph.facebook.com/v3.3/" + custom_label_id,
                qs: {
                    access_token: config.access_token
                },
                method: "DELETE"
            }, (err, response, body) => {
                console.log('delete_label', err, body)
                res(body)
            });
        })
    },
    get_labels_by_ids: function (custom_label_ids) {
        return new Promise(async (res, rej) => {
            var labelsName = new Array
            custom_label_ids.forEach(custom_label_id => {
                labelsName.push(this.get_label_details(custom_label_id))
            })
            Promise.all(labelsName)
                .then(result => {
                    resolve(result)
                })
        })
    }
}
