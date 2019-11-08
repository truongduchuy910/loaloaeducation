module.exports = function (app) {
    app.get('/messenger/profile', function (req, res) {
        res.render("pages/profile")
    })
    app.get('/messenger/broadcast', function (req, res) {
        res.render("pages/broadcast")
    })
    app.get('/messenger/login', function (req, res) {
        res.render("pages/login", { message: req.flash('login') })
    })
    app.get('/messenger/signup',
        function (req, res) {
            res.render("pages/signup", { message: req.flash('signup') })
        })
    app.get('/messenger/teacher', loggedIn, function (req, res) {
        res.render("pages/teacher", { user: req.user })
    })
    function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/messenger/login');
        }
    }
}