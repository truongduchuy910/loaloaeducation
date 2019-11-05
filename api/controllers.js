var { identity, customLabels } = require('../messenger/models').public;
module.exports = function (app) {
    app
        .get('/api/profile', (req, res) => {
            var { psid } = req.query;
            if (psid) {
                identity.profile(psid, (err, docs) => {
                    res.send(docs);
                })
            } else {
                res.send(null);
            }
        })
        .get('/api/get_all_labels', (req, res) => {
            customLabels.get_all_labels((err, docs) => {
                res.send(JSON.parse(docs).data);
            })

        })
        .get('/api/retrieving_labels_by_psid', (req, res) => {
            var { psid } = req.query;
            if (psid) {
                customLabels.retrieving_labels_by_psid(psid, (err, docs) => {
                    res.send(docs);
                })
            } else {
                res.send(null);
            }
        })
        .post('/api/associate_label', (req, res) => {
            var { psid, id } = req.query;
            if (psid, id) {
                customLabels.associate_label(psid, id, (err, docs) => {
                    res.send(docs);
                })
            } else {
                res.send(null);
            }
        })

}
