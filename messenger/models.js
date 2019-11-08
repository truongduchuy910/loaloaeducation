var labels = require('./api/labels');
var profile = require('./api/profile');
var identity = require('./api/identity');
var broadcast = require('./api/broadcast');
var views = require('./views');
var db = require('./database');
module.exports = {
    public: {
        db: db,
        identity: identity,
        labels: labels,
        broadcast: broadcast,
        views: views
    },
    senderRecognition: function (psid, callback) {

        db.sender.find({ psid: psid }, (err, users) => {
            if (users.length) {
                callback(null);
            } else {
                identity.profile(psid, (err, profile) => {
                    db.sender.insertMany({
                        psid: psid,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        profile_pic: profile.profile_pic
                    }, (err, newUser) => {
                        console.log('inserMany: ', newUser)
                        callback(newUser.first_name + ' ' + newUser.last_name)
                    })
                })

            }
        })

    },
    message: function (callback) {
        return;
    }

}