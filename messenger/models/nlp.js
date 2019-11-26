var wit = require('../../wit.ai/models')
var messenger = {
    label: require('./labels')
}
module.exports = {
    message: async (psid, text) => {
        var { entities } = await wit.message(text)
        var { request, label } = entities

        if (label[0].value) {
            var { id, error } = await messenger.label.create_label(label[0].value)
        }

        if (request[0].value == 'follow' && id) {
            await messenger.label.associate_label(psid, id)
            return `Theo dõi ${label[0].value} thành công`
        }
        if (request[0].value == 'unfollow' && id) {
            await messenger.label.unassociate_label(psid, id)
            return `Đã bỏ theo dõi ${label[0].value}`
        }
        return `Lỗi cú pháp!`
    }
}
