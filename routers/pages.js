module.exports = function (app) {
    app.get('/admin-login', function (req, res) {
        if (req.user && req.user.local) {
            res.render('pages/dashboard', { user: req.user });
        } else {
            res.render('pages/admin-login', { message: req.flash('loginMessage') })
        }
    })
    app.get('/signup', function (req, res) {
        res.render('pages/signup', { message: req.flash('signupMessage') })
    })
    app.get('/admin/dashboard', isLoggedIn, function (req, res) {
        res.render('pages/admin-dashboard', { user: req.user });
    })
    app.get('/', function (req, res) {
        res.redirect('/admin-login');
    })
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/admin-login');
}