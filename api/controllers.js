var ms = require('../messenger/models').public;
module.exports = function (app) {
    app
        .get('/messenger/profile', (req, res) => {
            var psid;
            console.log(req.body);
            if (req.body) {
                psid = req.body.psid;
            }
            if (psid) {
                ms.profile(psid, (err, docs) => {
                    res.send(err, docs);
                })
            } else {
                res.send('Lỗi cú pháp', null);
            }
        })
}