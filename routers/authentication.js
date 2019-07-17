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
    app.post('/teacher-login', passport.authenticate('local-teacher-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/teacher-login',
        failureFlash: true
    })
    );
    //------------------------------------------------------------------------------------------------------------
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/teacher-login');
    });
}