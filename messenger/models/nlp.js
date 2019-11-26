var wit = require('../../wit.ai/models')
var messenger = {
    label: require('./labels')
}
module.exports = {
    message: async (text) => {
        var { entities } = await wit.message(text)
        var { request, label } = entities
        var docs = await messenger.label.create_label(label[0].value)
        console.log(docs)
        console.log(request, label)
    }
}
