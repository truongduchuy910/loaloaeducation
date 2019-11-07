module.exports = function (text, url) {
    return {
        text: text,
        attachment: {
            type: "file",
            payload: {
                url: url,
                is_reusable: true
            }
        },
    }
}