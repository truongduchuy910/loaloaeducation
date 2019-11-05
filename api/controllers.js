var ms = require('../messenger/models').public;
module.exports = function (app) {
    app
        .get('/messenger/profile', (req, res) => {
            var psid;
            if (req.body) {
                psid = req.body.psid;
            }
            if (psid) {
                ms.profile(psid, (err, docs) => {
                    res.send(err, docs);
                })
            }
        })
}