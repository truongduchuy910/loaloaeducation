module.exports = function (app, passport) {
    app.post('/signup',
        function (req, res, next) {
            next();
        },
        passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            failureFlash: true
        }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
    );
    //------------------------------------------------------------------------------------------------------------
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
}