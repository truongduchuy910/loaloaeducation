var request = require('request')
module.exports = {
    //https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
    url: function (PSID, text, url, title) {
        console.log(process.env.PAGE_ACCESS_TOKEN)
        request({
            method: 'post',
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                "recipient": {
                    "id": PSID
                },
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": text,
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": url,
                                    "title": title,
                                    "webview_height_ratio": "tall"
                                }
                            ]
                        }
                    }
                }
            }
        }, (err, res, body) => {
            console.log(err, body);
        })
    }
}