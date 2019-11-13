var { broadcast, views, db } = require('../messenger/models').public;
module.exports = {
    broadcast: async function (labels, user, text, url) {
        var content, content_creative_id, content_id,
            attachment, attachment_creative_id, attachment_id;
        if (text) {
            content = views.text(`Thẻ ${user} gửi: ${text}`);
            let { message_creative_id } = await broadcast.creating_broadcast_messages([content]);
            content_creative_id = message_creative_id;
            if (labels.length > 1) {
                var { content_id } = await broadcast.sending_broadcast_messages_with_labe_predicates(content_creative_id, labels);
            } else {
                var { content_id } = await broadcast.sending_broadcast_messages_with_labe(content_creative_id, labels[0]);
            }

        }
        if (url) {
            attachment = views.attachment(`https://edu.loaloa.me${url}`)
            let { message_creative_id } = await broadcast.creating_broadcast_messages([attachment]);
            attachment_creative_id = message_creative_id;
            if (labels.length > 1) {
                var { attachment_id } = await broadcast.sending_broadcast_messages_with_labe_predicates(attachment_creative_id, labels);
            } else {
                var { attachment_id } = await broadcast.sending_broadcast_messages_with_labe(attachment_creative_id, labels[0]);

            }
        }


        db.broadcast.insertMany({
            user: user,
            content: content,
            attachment: attachment,
            content_creative_id: content_creative_id,
            attachment_creative_id: attachment_creative_id,
            content_id: content_id,
            attachment_id: attachment_id,
            labels: labels
        }, (err, docs) => {
            console.log(err, docs)
        })

    }
}