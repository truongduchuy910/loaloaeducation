var ms = require('../messenger/models').public;
module.exports = function (app) {
    app
        .get('/api/profile', (req, res) => {
            var psid;
            if (req.query) {
                psid = req.query.psid;
            }
            if (psid) {
                ms.profile(psid, (err, docs) => {
                    res.send(docs);
                })
            } else {
                res.send(null);
            }
        })
}