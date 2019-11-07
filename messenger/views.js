module.exports = {
    wellcome: function (name) {
        return {
            message: {
                text: `Chào mừng ${name} đến với Loa Loa Education. Rất cảm ơn bạn đã ủng hộ ứng dụng!`
            }
        }
    },
    dut: function (text) {
        return {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons: [
                        {
                            type: "web_url",
                            url: "http://sv.dut.udn.vn/G_Thongbao.aspx",
                            title: "Chi tiết",
                            webview_height_ratio: "tall"
                        }
                    ]
                }
            }
        }
    },
    loaloa: function (text, url) {
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
}