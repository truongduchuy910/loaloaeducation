//Tất cả, và chỉ những tao thác liên quan tới request đến Facebook sẽ được đặt ở đây

var request = require('request')
var config = require('../../configs.json')
module.exports = {
    creating_broadcast_messages: function () {

    },
    sending_broadcast_messages_with_labe: function () {

    },
    sending_broadcast_messages: function () {

    },
    create_label: function (PSID, Hashtag, callback) {
        request(
            {
                uri: "https://graph.facebook.com/v2.11/me/custom_labels",
                qs: {
                    access_token: config.messengerPlatform.access_token
                },
                method: "POST",
                json: {
                    name: Hashtag
                }
            },
            (err, res, body) => {
                callback(err, body);
            }
        )
    },
    retrieve_profile: function (PSID, callback) {
        request(
            {
                uri: `https://graph.facebook.com/${PSID}`,
                qs: {
                    access_token: config.messengerPlatform.access_token,
                    fields: "first_name, last_name, profile_pic"
                },
                method: "GET",
            }, (err, res, body) => {
                callback(err, body);
            }
        )
    },
    associate_label: function (PSID, ID, callback) {
        request(
            {
                uri: `https://graph.facebook.com/v2.11/${ID}/label`,
                qs: { access_token: config.messengerPlatform.access_token },
                method: "POST",
                json: {
                    user: PSID
                }
            }, (err, res, body) => {
                callback(err, body)
            }
        );
    }
}




module.exports.associate_label = associate_label;
function message_creatives(message, callback) {
    request({
        uri: "https://graph.facebook.com/v2.11/me/message_creatives",
        qs: { access_token: config.messengerPlatform.access_token },
        method: "POST",
        json: {
            messages: [message]
        }
    }, (err, res, Body) => {
        callback(err, Body);

    });
}


function broadcast_messages(message_creative_id, custom_label_id, callback) {
    request({
        uri: "https://graph.facebook.com/v2.11/me/broadcast_messages",
        qs: { access_token: config.messengerPlatform.access_token },
        method: "POST",
        json: {
            message_creative_id: message_creative_id,
            custom_label_id: custom_label_id
        }
    }, (err, res, Body) => {
        callback(err, Body);
    });
}


function in_array(PSID, PSIDs) {
    var in_array = false;
    if (PSIDs.length) {
        PSIDs.forEach(element => {
            if (element == PSID) in_array = true;
        })
    } else {
        if (PSID == PSIDs) in_array = true;
    }
    return in_array;
}
var Broadcast = require('../../models/broadcast');

function broadcast(PSID, label, message, callback) {
    Label.findOne({ name: label }, function (error, labels) {
        if (labels) {
            if (in_array(PSID, labels.PSID)) {
                message_creatives(message, function (error, docs) {
                    if (docs.message_creative_id && labels.ID) {
                        console.log('Phát tán tin nhắn có ID: ' + docs.message_creative_id + '. Vào thẻ ' + labels.ID);
                        broadcast_messages(docs.message_creative_id, labels.ID, function (error, docs) {
                            console.log('Gọi xong, dữ liệu: ');
                            if (!docs.error) {
                                if (message.text) {
                                    var new_broadcast = new Broadcast();
                                    new_broadcast.PSID = PSID;
                                    new_broadcast.ID = docs.broadcast_id;
                                    new_broadcast.label = label;
                                    new_broadcast.content = message.text;
                                    var d = new Date();
                                    new_broadcast.date = d.getTime();
                                    new_broadcast.save(function (err) {
                                        callback(null, {
                                            message: 'Phát tán thành công.'
                                        });
                                    });
                                } else {
                                    callback(null, {
                                        message: 'Gửi tệp đính kèm thành công.'
                                    });
                                }
                            } else {
                                callback({
                                    message: 'Phát tán không thành công'
                                }, null);
                            }


                        })
                    } else {
                        console.log(error, docs);
                        callback({
                            message: 'Lỗi: Tạo tin nhắn để phát tán thất bại.'
                        }, null);
                    }
                })
            } else {
                callback({
                    message: 'Bạn không có quyền gửi vào thẻ ' + label + '. Bạn chỉ có quyền gửi vào thẻ nằm trong danh sách đã tạo'
                }, null);
            }
        } else {
            callback({
                message: 'Thẻ ' + label + ' không tồn tại.'
            }, null);
        }
    })
}
module.exports.broadcast = broadcast;

//https://developers.facebook.com/docs/messenger-platform/send-messages#message_types 
function send(PSID, message, callback) {
    request({
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: config.messengerPlatform.access_token
        },
        method: "POST",
        json: {
            recipient: {
                id: PSID
            },
            message: message
        }
    }, (err, res, body) => {
        callback(err, body);
    })
}
module.exports.retrieve_PSID_label = retrieve_PSID_label;
module.exports.send = send;

function history(PSID, action, status) {
    var history = PSID + ' > ' + action + ' | phản hồi: ' + status;
    console.log(history.blue);
}