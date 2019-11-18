var db = require('../messenger/database')
module.exports = {
    findSuccessId: (id) => {
        return new Promise(async (res, rej) => {
            db.broadcast.findById(id, (err, docs) => {
                res(docs)
            })
        })
    },
    findAllSuccess: () => {
        return new Promise(async (res, rej) => {
            db.broadcast.find({}, (err, docs) => {
                console.log(err, docs);
                res(docs)
            })
        })
    }
}