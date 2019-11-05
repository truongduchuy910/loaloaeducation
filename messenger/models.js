var database = require('./database')
var customLabels = require('./api/customLabels');
var profile = require('./api/profile');
var identity = require('./api/identity');
var profile = require('./api/profile');
module.exports = {
    public: {
        identity: identity,
        customLabels: customLabels
    },
    sender: function (psid, callback) {

        database.find({ psid: psid }, (err, users) => {
            if (users.length) {
                callback(null);
            } else {
                identity.profile(psid, (err, profile) => {
                    database.insertMany({
                        psid: psid,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        profile_pic: profile.profile_pic
                    }, (err, newUser) => {
                        callback({
                            message: `Chào mừng ${newUser.first_name} ${newUser.last_name} đến với Loa Loa Education.
                            Rất vui vì sự ủng hộ của bạn đối với ứng dụng.`
                        })
                    })
                })

            }
        })

    },

}