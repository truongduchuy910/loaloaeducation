var { broadcast, views, db, labels } = require('../messenger/models').public;
module.exports = {
    broadcast: async function (labels_id, user, text, url) {
        return new Promise(async (reject, resolve) => {
            var content, content_creative_id, content_id,
                attachment, attachment_creative_id, attachment_id;
            if (text) {
                content = views.text(`Thẻ ${user} gửi: ${text}`).text;
                let { message_creative_id } = await broadcast.creating_broadcast_messages([content]);
                content_creative_id = message_creative_id;
                if (labels_id.length > 1) {
                    let { broadcast_id } = await broadcast.sending_broadcast_messages_with_labe_predicates(content_creative_id, labels_id);
                    content_id = broadcast_id;
                } else {
                    let { broadcast_id } = await broadcast.sending_broadcast_messages_with_labe(content_creative_id, labels_id[0]);
                    content_id = broadcast_id;
                }

            }
            if (url) {
                attachment = views.attachment(`https://edu.loaloa.me${url}`)
                let { message_creative_id } = await broadcast.creating_broadcast_messages([attachment]);
                attachment_creative_id = message_creative_id;
                if (labels_id.length > 1) {
                    let { broadcast_id } = await broadcast.sending_broadcast_messages_with_labe_predicates(attachment_creative_id, labels_id);
                    attachment_id = broadcast_id;
                } else {
                    let { broadcast_id } = await broadcast.sending_broadcast_messages_with_labe(attachment_creative_id, labels_id[0]);
                    attachment_id = broadcast_id;
                }
            }
            var labelsName = new Array;
            labels_id.forEach(async id => {
                labelsName.push(labels.get_label_details(id))
            })
            Promise.all(labelsName)
                .then(result => {
                    db.broadcast.insertMany({
                        user: user,
                        content: content,
                        attachment: attachment,
                        content_creative_id: content_creative_id,
                        attachment_creative_id: attachment_creative_id,
                        content_id: content_id,
                        attachment_id: attachment_id,
                        labels: result
                    }, (err, docs) => {
                        console.log(err, docs)
                        resolve(docs)
                    })
                })

        })


    }
}