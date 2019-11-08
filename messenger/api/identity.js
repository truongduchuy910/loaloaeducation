var request = require('request')
module.exports = {
    profile: function (psid, callback) {
        request({
            method: 'get',
            uri: 'https://graph.facebook.com/' + psid,
            qs: {
                access_token: 'EAAFwU7ZAQ25UBAO2PxiqZBB7eqZAJ1tQwn39h4gz0yIVglLfBRdDqCv9PoPV9Sb97pb0gEbpfMojewfUDXXh9G5F3HqVqm3zfXJIJfh9FSOiJiFz1y3PZAIRgFqfOLrxe2QDkWNoTbUnRsGJ5DelZADGFgd2bjqnoiwTu3zlEFHzEmMMresJzLCnaJ86fBRcZD'
            },
            json: {
                fields: ["first_name", "last_name", "profile_pic"]
            }
        }, (err, res, body) => {
            console.log('profile', err, body.data)
            callback(err, body);
        })
    }
}