var db = require('../messenger/database')
module.exports = {
    findSuccessId: (id) => {
        return new Promise((rej, res) => {
            db.broadcast.findById(id, (err, docs) => {
                console.log(err, docs)
                res(docs)
            })
        })
    }
}