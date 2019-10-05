var request = require('request')
module.exports = {
    greeting: function () {

    },
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
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "Talk to an agent",
                                "payload": "CARE_HELP"
                            },
                            {
                                "type": "postback",
                                "title": "Outfit suggestions",
                                "payload": "CURATION"
                            },
                            {
                                "type": "web_url",
                                "title": "Shop now",
                                "url": "https://www.originalcoastclothing.com/",
                                "webview_height_ratio": "tall"
                            }
                        ]
                    }
                ]
            }
        }, (err, res, body) => {
            console.log(err, body);
        })
    }
}