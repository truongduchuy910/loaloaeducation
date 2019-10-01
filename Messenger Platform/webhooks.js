module.exports = function (app) {
    app.post('/messenger-platform/webhooks', function (req, res) {
        console.log(req.body, req.query)
    })
    app.get('*', (req, res) => { res.send('wellcome to messenger platform feature') })
}