var request = require('request')
var config = require('../config')
module.exports = {
    profile: function (psid) {
        return new Promise(async (res, rej) => {
            request({
                method: 'get',
                uri: `https://graph.facebook.com/${psid}`,
                qs: {
                    access_token: config.access_token
                },
                json: {
                    fields: ["first_name", "last_name", "profile_pic"]
                }
            }, (err, res, body) => {
                console.log('profile', err, body)
                res(body)
            })
        })
    }
}