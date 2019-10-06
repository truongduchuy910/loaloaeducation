var mongoose = require('mongoose')

module.exports = function () {
    console.log(process.env.uri)
    mongoose.connect("mongodb://127.0.0.1:27017/yensaodatquang", { useNewUrlParser: true }, (err) => {
        if (!err) {
            console.log('Kết nối thành công tới mongodb');
        } else {
            console.log(err)
            throw err
        }
    })
    return mongoose
}
