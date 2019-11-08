// config/passport.js
var LocalStrategy = require('passport-local').Strategy;
var database = require('./database');
module.exports = function (passport) {
    passport.use('verify', function (req) {

    })
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        database.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            database.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('login', 'Không tìm thấy tài khoản'));
                }
                if (user.local.password != password) {
                    return done(null, false, req.flash('login', 'Mật khẩu chưa đúng'));
                }
                return done(null, user);
            });
        }));
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                database.findOne({ 'local.email': email }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signup', 'Email  đã tồn tại .'));
                    } else {
                        var newUser = new database();
                        newUser.local.email = email;
                        newUser.local.password = password;
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));
};
