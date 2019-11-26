var wit = require('../../wit.ai/models')
var messenger = {
    label: require('./labels')
}
module.exports = {
    message: async (text) => {
        var { entities } = await wit.message(text)
        var { request, label } = entities
        var { id, error } = await messenger.label.create_label(label[0].value)
        console.log('id: ', id, 'error: ', error)
        console.log(request, label)
    }
}
