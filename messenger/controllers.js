//Trong phần này, database được lưu trên facebook, chỉ clone những database cần thiết để thực hiện cho nhanh
var broadcast = require('./models/broadcast');
var identity = require('./models/identity');
var labels = require('./models/labels');
var database = require('./database')
var formidable = require('formidable');
module.exports = function (app) {
    app
        //NHÓM API SỬ DỤNG MODELS

        //IDENTITY
        .post('/messenger/identity/profile', async (req, res) => {
            var profile = await identity.profile(req.query.psid)
            res.send(profile)
        })

        //LABELS
        .post('/messenger/labels/get_all_labels', async (req, res) => {
            var get_all_labels = await labels.get_all_labels()
            res.send(get_all_labels)
        })
        .post('/messenger/labels/retrieving_labels_by_psid', (req, res) => {
            var retrieving_labels_by_psid = await labels.retrieving_labels_by_psid(req.query.psid)
            res.send(retrieving_labels_by_psid)
        })
        .post('/messenger/labels/associate_label', async (req, res) => {
            var associate_label = await labels.associate_label(req.body.psid, req.body.id)
            res.send(associate_label)
        })
        .post('/messenger/labels/unassociate_label', (req, res) => {
            var unassociate_label = await labels.unassociate_label(req.body.psid, req.body.id)
            res.send(unassociate_label);
        })

        //DATABASE
        .post('/messenger/broadcast/get_notification_by_user', (req, res) => {
            database.broadcast.find({ user: req.query.user }, (err, docs) => {
                res.send(docs)
            })
        })

        //ORTHER
        .post('/messenger/err', (req, res) => {
            console.log('api err: ', req.body)
            res.send();
        })

        .post('/messenger/log', (req, res) => {
            console.log('\n.\n.\n.\n.\n.\n.\n.');
            console.log('============================')
            console.log('api log: ', req.body)
            res.send();
        })

    //NHÓM API CẦN ĐĂNG NHẬP
    // .post('/messenger/broadcast', function (req, res) {
    //     var form = new formidable.IncomingForm();
    //     form.uploadDir = "./website/public/upload";
    //     form.keepExtensions = true;

    //     form.parse(req, async function (err, fields, files) {
    //         if (err) throw err;
    //         var url = null;
    //         if (files.upload.name) {
    //             url = files.upload.path.slice(14);
    //         }
    //         broadcast.broadcast_in_website(fields.labels.split(","), fields.user, fields.text, url)
    //         res.redirect(`/messenger/manage`)
    //     });

    // })
}