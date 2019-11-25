var request = require('request')
var config = require('../config')
module.exports = function () {
    console.log('profile')
    request({
        method: 'post',
        uri: 'https://graph.facebook.com/v3.3/me/messenger_profile',
        qs: {
            access_token: config.access_token
        },
        json: {
            "get_started": {
                "payload": "GET_STARTED"
            },
            "persistent_menu": [
                {
                    "locale": "default",
                    "composer_input_disabled": "false",
                    "call_to_actions": [

                        {
                            "messenger_extensions": "true",
                            "type": "web_url",
                            "title": "Trang Cá Nhân",
                            "url": "https://edu.loaloa.me/messenger/profile",
                            "fallback_url": "https://edu.loaloa.me/messenger/profile",
                            "webview_height_ratio": "tall"
                        },
                        {
                            "messenger_extensions": "true",
                            "type": "web_url",
                            "title": "Gửi Thông Báo",
                            "url": "https://edu.loaloa.me/messenger/broadcast",
                            "fallback_url": "https://edu.loaloa.me/messenger/broadcast",
                            "webview_height_ratio": "tall"
                        },
                    ]
                }
            ],
            "greeting": [
                {
                    "locale": "default",
                    "text": "Chào mừng {{user_first_name}} đến với Loa Loa Education - Hệ thống thông báo cho trường học! Rất cảm ơn bạn đã sử dụng ứng dụng."
                }
            ],
            "whitelisted_domains": [
                "https://edu.loaloa.me",
                "https://loaloa.me",
            ],
            // "ice_breakers": [
            //     {
            //         "question": "<QUESTION>",
            //         "payload": "<PAYLOAD>",
            //     },
            //     {
            //         "question": "<QUESTION>",
            //         "payload": "<PAYLOAD>",
            //     },

            // ]
        }
    }, (err, res, body) => {
        console.log(err, body);
    })
}