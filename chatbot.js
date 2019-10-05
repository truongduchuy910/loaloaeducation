const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 1337
var flash = require('connect-flash');
var session = require('express-session');
const bodyParser = require('body-parser')
const logger = require('morgan');
const app = express();
// mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true }, (err) => {
//   if (!err) {
//     console.log('connected to mongodb');
//   }
// });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'website/views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(flash());

require('./Messenger/webhooks')(app)
require('./website/controllers/messenger')(app)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
