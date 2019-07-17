const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport')
const bodyParser = require('body-parser')
const logger = require('morgan');
const app = express();
mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('connected to mongodb');
  }
});
require('./configs/passport')(passport);
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routers/authentication')(app, passport)
require('./routers/pages')(app)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
