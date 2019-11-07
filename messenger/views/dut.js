module.exports = function (text) {
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
}