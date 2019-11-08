var passport = require('passport')
var session = require('express-session');
var flash = require('connect-flash');

module.exports = function (app) {
    app.use(session({ secret: 'truongduchuy910' }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    require('./models')(passport)
    app.post('/authentication/signup',
        function (req, res, next) {
            next();
        },
        passport.authenticate('local-signup', {
            successRedirect: '/messenger/login',
            failureRedirect: '/messenger/signup',
            failureFlash: true
        }));
    app.post('/authentication/login', passport.authenticate('local-login', {
        successRedirect: '/messenger/teacher',
        failureRedirect: '/messenger/login',
        failureFlash: true
    })
    );
    //------------------------------------------------------------------------------------------------------------
    app.get('/authentication/logout', function (req, res) {
        req.logout();
        res.redirect('/messenger/login');
    });
}