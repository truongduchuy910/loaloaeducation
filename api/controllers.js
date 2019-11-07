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
            res.send([
                { name: '18N15', id: '21138798634' },
                { name: '18N16', id: '21328798634' },
                { name: '18N17', id: '21383798634' },
                { name: '18N18', id: '21387498634' },
                { name: '18N19', id: '21387958634' },

            ]);
            // customLabels.get_all_labels((err, docs) => {
            //     res.send(docs.data);
            // })

        })
        .get('/api/retrieving_labels_by_psid', (req, res) => {
            res.send([
                { name: '18N15', id: '21138798634' },
                { name: '18N16', id: '21328798634' },
                { name: '18N17', id: '21383798634' },
                { name: '18N18', id: '21387498634' },
                { name: '18N19', id: '21387958634' },

            ]);
            // var { psid } = req.query;
            // if (psid) {
            //     customLabels.retrieving_labels_by_psid(psid, (err, docs) => {
            //         res.send(docs.data);
            //     })
            // } else {
            //     res.send(null);
            // }
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
        .post('/api/unassociate_label', (req, res) => {
            var { psid, id } = req.query;
            if (psid, id) {
                customLabels.remove_label(psid, id, (err, docs) => {
                    res.send(docs);
                })
            } else {
                res.send(null);
            }
        })

}
