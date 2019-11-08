var { identity, labels } = require('../messenger/models').public;
module.exports = function (app) {
    app
        .get('/api/profile', (req, res) => {
            console.log(req.query);
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
            console.log(req.query);
            labels.get_all_labels((err, docs) => {
                res.send(docs.data);
            })

        })
        .get('/api/retrieving_labels_by_psid', (req, res) => {
            console.log(req.query);
            var { psid } = req.query;
            if (psid) {
                labels.retrieving_labels_by_psid(psid, (err, docs) => {
                    res.send(docs.data);
                })
            } else {
                res.send(null);
            }
        })
        .post('/api/associate_label', (req, res) => {
            console.log(req.body);
            var { psid, id, name } = req.body;
            if (psid && id && name) {
                labels.associate_label(psid, id, (err, docs) => {
                    if (docs && docs.success) {
                        res.send({
                            id: id,
                            name: name
                        });
                    }
                })
            } else {
                res.send(null);
            }
        })
        .post('/api/unassociate_label', (req, res) => {
            console.log(req.body);
            var { psid, id, name } = req.body;
            if (psid && id && name) {
                labels.remove_label(psid, id, (err, docs) => {
                    if (docs && docs.success) {
                        res.send({
                            id: id,
                            name: name
                        });
                    }
                })
            } else {
                res.send(null);
            }
        })

}
