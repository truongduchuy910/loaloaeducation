var passport = require('passport')
module.exports = function (app) {
    require('../modules/authentication')(app, passport)
    app.post('/signup',
        function (req, res, next) {
            next();
        },
        passport.authenticate('local-signup', {
            successRedirect: '/messenger/login',
            failureRedirect: '/signup',
            failureFlash: true
        }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/messenger/broadcast',
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