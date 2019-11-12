var labels = require('./api/labels');
var profile = require('./api/profile');
//profile();
var identity = require('./api/identity');
var broadcast = require('./api/broadcast');
var views = require('./views');
var db = require('./database');
var send = require('./api/send')
module.exports = {
    public: {
        db: db,
        identity: identity,
        labels: labels,
        broadcast: broadcast,
        views: views
    },
    senderRecognition: function (psid) {

        db.sender.find({ psid: psid }, (err, users) => {
            if (users.length == 0) {
                console.log('new user');
                identity.profile(psid, (err, profile) => {
                    db.sender.insertMany({
                        psid: psid,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        profile_pic: profile.profile_pic
                    }, (err, newUser) => {
                        console.log('inserMany: ', newUser)
                    })
                })

            }
        })

    },
    message: function (psid, message) {
        send.message(psid, {
            text: message + ' là cái gì mầy?'
        })
    }

}
