var LocalStrategy = require('passport-local').Strategy
var { user } = require('../../database/database')

module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());


    passport.use('verify', function (req) {
    })

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            user.findOne({ 'local.email': email }, function (err, docs) {
                if (err) {
                    return done(err);
                } else {
                    if (!docs) {
                        return done(null, false, req.flash('loginMessage', 'Không tìm thấy tài khoản'));
                    } else {
                        if (docs.password || docs.local.password != password) {
                            return done(null, false, req.flash('loginMessage', 'Mật khẩu chưa đúng'));
                        } else {
                            return done(null, docs);
                        }
                    }

                }

            });
        }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                user.findOne({ 'local.email': email }, function (err, userProfile) {
                    if (err)
                        return done(err);
                    if (userProfile) {
                        return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
                    } else {
                        user.insertMany({
                            "local.email": email,
                            "local.password": password
                        }, (err, docs) => {
                            if (err)
                                throw err;
                            return done(null, docs[0]);
                        })
                    }
                });
            });
        })
    );
}