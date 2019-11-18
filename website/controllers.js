var formidable = require('formidable');
var fs = require('fs');
var models = require('./models')
module.exports = function (app) {
    app.get('/messenger/profile', function (req, res) {
        res.render("pages/profile")
    })

    app.get('/messenger/login', function (req, res) {
        res.render("pages/login", { message: req.flash('login') })
    })
    app.get('/messenger/signup',
        function (req, res) {
            res.render("pages/signup", { message: req.flash('signup') })
        })
    app.get('/messenger/broadcast', loggedIn, function (req, res) {
        res.render("pages/broadcast", { user: req.user })
    })
    app.get('/messenger/manage', async (req, res) => {
        var docs = await models.findAllSuccess();
        res.render('pages/manage', { docs: docs })
    })
    app.get('/messenger/success/:id', async (req, res) => {
        res.render('pages/success')
    })
    app.get('/admin', loggedIn, function (req, res) {
        res.render("admin/dashboard", { user: req.user })
    })
    app.post('/messenger/upload', function (req, res) {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./website/public/upload";
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
            if (err) throw err;
            var oldpath = files.datafile.path;
            var newpath = 'website/public/' + fields.psid + '/' + files.datafile.name;
            fs.mkdir('website/public/' + fields.psid, { recursive: true }, (err) => {
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    res.write('Tải lên thành công!');
                    res.end();
                });
            });



        });

    })
    function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/messenger/login');
        }
    }
}