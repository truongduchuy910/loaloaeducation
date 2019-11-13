var labels = require('./api/labels');
var profileApi = require('./api/profile');
//profileApi();
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

        db.sender.findOne({ psid: psid }, (err, user) => {
            console.log('find user: ', user)
            if (!user) {
                identity.profile(psid, (err, profile) => {
                    db.sender.insertMany({
                        psid: psid,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        profile_pic: profile.profile_pic
                    }, (err, newUser) => {
                        console.log('Insert user: ', newUser)
                    })
                })

            } else if (!user.first_name) {
                identity.profile(psid, (err, profile) => {
                    db.sender.findOneAndUpdate(
                        {
                            psid: psid
                        },
                        {
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            profile_pic: profile.profile_pic
                        }, (err, newUser) => {
                            console.log('Update user: ', newUser)
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
