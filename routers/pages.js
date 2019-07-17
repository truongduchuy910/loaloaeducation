module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('pages/login', { message: req.flash('loginMessage') })
    })
    app.get('/signup', function (req, res) {
        res.render('pages/signup', { message: req.flash('signupMessage') })
    })
    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('pages/dashboard', { user: req.user });
    })
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}