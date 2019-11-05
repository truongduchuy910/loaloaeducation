var models = require("./models.js")
var database = require('./database')
var send = require('./api/send')
var identity = require('./api/identity')
module.exports = function (app) {
    app.post('/messenger/webhooks', function (req, res) {
        let body = req.body;
        console.log('received');
        if (body.object == 'page') {

            body.entry.forEach(function (entry) {
                var webhooks_event = entry.messaging[0];
                var { message, sender } = webhooks_event;
                var psid = sender.id;
                database.find({ psid: psid }, (err, docs) => {
                    identity.profile(psid, (err, profile) => {
                        database.findOneAndUpdate({ psid: psid }, {
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            profile_pic: profile.profile_pic
                        }, (err, docs) => {
                            console.log(docs);
                        })
                    })
                    console.log('documents in messengers collection');
                    console.log(docs);
                    if (!docs.length) {
                        database.insertMany({
                            psid: psid
                        }, (err, docs) => {
                            console.log(docs);
                        })
                    }
                })
                if (message) {
                    console.log(message);
                }
            });

            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }

    })
    app.get('/messenger/webhooks', (req, res) => {
        let VERIFY_TOKEN = "truongduc910"
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {

            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                res.sendStatus(403);
            }
        }
    });
}
