module.exports = {
    wellcome: function (name) {
        return {
            text: `Chào mừng ${name} đến với Loa Loa Education. Rất cảm ơn bạn đã ủng hộ ứng dụng!`
        }
    },
    dut_G_Thongbao: function (text) {
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
    dut_G_Thongbao_LopHP: function (text) {
        return {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons: [
                        {
                            type: "web_url",
                            url: "http://sv.dut.udn.vn/G_Thongbao_LopHP.aspx",
                            title: "Chi tiết",
                            webview_height_ratio: "tall"
                        }
                    ]
                }
            }
        }
    },
    text: function (text) {
        return {
            text: text,
        }
    },
    attachment: function (url) {
        return {
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