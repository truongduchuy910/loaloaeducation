const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1337
var flash = require('connect-flash');
var session = require('express-session');
const bodyParser = require('body-parser')
const logger = require('morgan');
const app = express();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chatbot?retryWrites=true', { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('connected to mongodb');
  }
});
app.use(logger('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'website/public')))
app.set('views', path.join(__dirname, 'website/views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(flash());

require('./messenger/webhooks')(app)
require('./website/controllers')(app)
require('./api/controllers')(app)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
