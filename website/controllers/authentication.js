module.exports = function (app, passport) {
    app.post('/signup',
        function (req, res, next) {
            next();
        },
        passport.authenticate('local-signup', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/signup',
            failureFlash: true
        }));
    app.post('/admin-login', passport.authenticate('local-admin-login', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin-login',
        failureFlash: true
    })
    );
    //------------------------------------------------------------------------------------------------------------
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/admin-login');
    });
}