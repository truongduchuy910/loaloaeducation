var ms = require('../messenger/models').public;
module.exports = {
    broadcast: function (labels, user, text, files) {
        var views;
        console.log(files);
        if (files.path) {
            views = [ms.views.attachment(text, files.path.slice(14))]
        } else {
            views = [ms.views.text(text)]
        }
        ms.broadcast.creating_broadcast_messages(
            views,
            (err, message) => {
                labels.forEach(id => {
                    ms.broadcast.sending_broadcast_messages_with_labe(
                        message.message_creative_id, id, (err, broadcast) => {
                            ms.db.broadcast.insertMany({
                                user: user,
                                broadcast_id: broadcast.broadcast_id,
                                message_creative_id: message.message_creative_id
                            }, (err, docs) => {
                                console.log(user, 'send broadcast: ', docs);
                            })
                        })
                })

            }
        )
    }
}