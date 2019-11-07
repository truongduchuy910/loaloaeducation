//https://developers.facebook.com/docs/messenger-platform/identity/custom-labels
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
    associate_label: function (psid, id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/" + id + "/label",
            qs: { access_token: config.access_token },
            method: "POST",
            json: {
                user: psid
            }
        }, (err, res, body) => {
            callback(err, body)
        }
        );
    },
    remove_label: function (psid, id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/" + id + "/label",
            qs: { access_token: config.access_token },
            method: "DELETE",
            json: {
                user: psid
            }
        }, (err, res, body) => {
            callback(err, body)
        });
    },
    retrieving_labels_by_psid: function (psid, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/" + psid + "/custom_labels",
            qs: {
                fields: "name",
                access_token: config.access_token
            },
            method: "GET",
        }, (err, res, body) => {
            callback(err, JSON.parse(body))
        });
    },
    get_all_labels: function (callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/me/custom_labels",
            qs: {
                fields: "name",
                access_token: config.access_token
            },
            method: "GET",
        }, (err, res, body) => {
            callback(err, JSON.parse(body))
        });
    },
    get_label_details: function (custom_label_id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/" + custom_label_id,
            qs: {
                fields: "name",
                access_token: config.access_token
            },
            method: "GET",
        }, (err, res, body) => {
            callback(err, body)
        });
    }
    ,
    delete_label: function (custom_label_id, callback) {
        request({
            uri: "https://graph.facebook.com/v2.11/" + custom_label_id,
            qs: {
                access_token: config.access_token
            },
            method: "DELETE"
        }, (err, res, body) => {
            callback(err, body)
        });
    }
}
