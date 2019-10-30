var request = require('request')
module.exports = {

    get_started: function () {
        request({
            method: 'post',
            uri: 'https://graph.facebook.com/v4.0/me/messenger_profile',
            qs: {
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                "get_started": {
                    "payload": "GET_STARTED_PAYLOAD"
                }
            }
        }, (err, res, body) => {
            console.log(err, body);
        })
    },
    persistent: function () {
        console.log(process.env.PAGE_ACCESS_TOKEN)
        request({
            method: 'post',
            uri: 'https://graph.facebook.com/v4.0/me/messenger_profile',
            qs: {
                access_token: 'EAACubcIenBMBAN0kDLkpv4i4QlrDyEMkcfZBklEDIsqQsgoULabfMcioPjcXbLZCU7Tx34yZAk0ciV7pSdQPg01CRlI7L9ZC8pwPgnVOJnEBVC4BhHUgaXrLGACw0G3NOUwksjxB70lOaJFskZB7ORPrVZAQeBJGKL4XxZCJicMWrfJUP9CwpSVisjmZA3oqV30ZD'
            },
            json: {
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [

                            {
                                "type": "web_url",
                                "title": "Nhập Thông Tin Cá Nhân",
                                "url": "https://edu.loaloa.me/messenger/profile",
                                "webview_height_ratio": "tall"
                            },
                            {
                                "type": "web_url",
                                "title": "Gửi Thông Báo",
                                "url": "https://edu.loaloa.me/messenger/broadcast",
                                "webview_height_ratio": "tall"
                            },
                        ]
                    }
                ]
            }
        }, (err, res, body) => {
            console.log("done persistent");
            console.log(err, body);
        })
    },
    greeting: function () {
        request({
            method: 'post',
            uri: 'https://graph.facebook.com/v4.0/me/messenger_profile',
            qs: {
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                "greeting": [
                    {
                        "locale": "default",
                        "text": "Hello {{user_first_name}}!"
                    }
                ]
            }
        }, (err, res, body) => {
            console.log(err, body);
        })
    },
    whitelisted_domains: function () {
        request({
            method: 'post',
            uri: 'https://graph.facebook.com/v4.0/me/messenger_profile',
            qs: {
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                "whitelisted_domains": [
                    "https://yensaodatquang.vn>",
                ]
            }
        }, (err, res, body) => {
            console.log(err, body);
        })
    }
}