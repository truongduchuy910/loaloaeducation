const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1338
const bodyParser = require('body-parser')
const logger = require('morgan');
var app = express();
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

require('./authentication/controllers')(app)
require('./messenger/webhooks')(app)
require('./website/controllers')(app)
require('./api/controllers')(app)
require('./puppeteer/controllers')(app)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
