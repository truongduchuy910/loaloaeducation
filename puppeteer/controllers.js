var models = require('./models')
module.exports = function (app) {
    app
        .get('/puppeteer/dut', models.dut)
}