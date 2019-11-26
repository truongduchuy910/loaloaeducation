var models = require('./models/wit');
module.exports = function (app) {
    app.post('/messenger/webhooks', function (req, res) {
        let body = req.body;
        console.log(body.entry)
        if (body.object == 'page') {
            body.entry.forEach(entry => {
                var { message, sender, postback } = entry.messaging[0];
                var psid = sender.id;
                if (psid) {

                }
                if (message) {
                    models.message(message.text)
                    //     models.message(psid, message.text)
                }
            })
        }

        if (postback) {
            if (postback.payload == 'GET_STARTED') {

            }
        }
    });

    res.status(200).send('EVENT_RECEIVED');
} else {
    res.sendStatus(404);
}

    })
app.get('/messenger/webhooks', (req, res) => {
    console.log(req.query)
    let VERIFY_TOKEN = "truongduc910"
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            console.log('WEBHOOK_VERIFI_FAIL');
            res.sendStatus(403);
        }
    } else {
        console.log('WEBHOOK_VERIFI_FAIL');
        res.sendStatus(403);
    }
});
}
