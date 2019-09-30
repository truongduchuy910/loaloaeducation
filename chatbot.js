const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var flash = require('connect-flash');
var session = require('express-session');
const bodyParser = require('body-parser')
const logger = require('morgan');
const app = express();
mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('connected to mongodb');
  }
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(flash());

require('./webhooks')
require('./controllers/')

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
