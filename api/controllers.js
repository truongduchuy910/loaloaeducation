var { identity, labels } = require('../messenger/models').public;
var ms = require('../messenger/models').public;
var models = require('./models');
var formidable = require('formidable');

module.exports = function (app) {
    app
        .get('/api/profile', (req, res) => {
            console.log(req.query);
            var { psid } = req.query;
            if (psid) {
                ms.db.sender.findOne({ psid: psid }, (err, docs) => {
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
        .post('/api/err', (req, res) => {
            console.log('api err: ', req.body, req.query)
            res.send();
        })
        .post('/api/broadcast', function (req, res) {
            var form = new formidable.IncomingForm();
            form.uploadDir = "./website/public/upload";
            form.keepExtensions = true;

            form.parse(req, function (err, fields, files) {
                if (err) throw err;
                models.broadcast(fields.labels.split(","), fields.user, fields.text, files)
                res.redirect('/messenger/broadcast')
            });

        })

}
