var models = require('./models');
var send = require('./api/send');
module.exports = function (app) {
    app.post('/messenger/webhooks', function (req, res) {
        let body = req.body;
        if (body.object == 'page') {

            body.entry.forEach(entry => {
                var { message, sender } = entry.messaging[0];
                var psid = sender.id;
                if (psid) {
                    models.sender(psid, docs => {
                        if (docs) {
                            send.message(psid, docs.message)
                        }
                    })
                }

                if (message) {
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
