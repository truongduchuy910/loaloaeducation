module.exports = function (app) {
    app.get('/messenger/profile', function (req, res) {
        res.render("pages/profile")
    })
    app.get('/messenger/broadcast', function (req, res) {
        res.render("pages/broadcast")
    })
    app.get('/messenger/login', function (req, res) {
        res.render("pages/login")
    })
}