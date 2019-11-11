var data = {
    files: [
        {
            name: "Đang tải...",
            path: "/"
        },
        {
            name: "Đang tải...",
            path: "/"
        },
    ],
    get_all_labels: [
        {
            id: 'đang tải...',
            name: 'đang tải...'
        },
        {
            id: 'đang tải...',
            name: 'đang tải...'
        }, {
            id: 'đang tải...',
            name: 'đang tải...'
        }
    ]
}
var element = {
    files: {
        box: document.getElementById('files'),
        items: document.getElementsByClassName('files')[0].outerHTML
    },
    get_all_labels: {
        box: document.getElementById('get_all_labels'),
        items: document.getElementsByClassName('get_all_labels')[0].outerHTML
    }
}
function contentUpdate() {
    var html = '';
    data.files.forEach(file => {
        html += element.files.items.replace(/NAME/g, file.name).replace(/PATH/g, file.path);
    })
    element.files.box.innerHTML = html;
    html = '';
    data.get_all_labels.forEach(file => {
        html += element.get_all_labels.items.replace(/NAME/g, file.name).replace(/ID/g, file.path);
    })
    element.get_all_labels.box.innerHTML = html;
}
contentUpdate();
function fileUpload(form, action_url, div_id) {
    // Create the iframe...
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "upload_iframe");
    iframe.setAttribute("name", "upload_iframe");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("height", "0");
    iframe.setAttribute("border", "0");
    iframe.setAttribute("style", "width: 0; height: 0; border: none;");

    // Add to document...
    form.parentNode.appendChild(iframe);
    window.frames['upload_iframe'].name = "upload_iframe";

    iframeId = document.getElementById("upload_iframe");

    // Add event...
    var eventHandler = function () {

        if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
        else iframeId.removeEventListener("load", eventHandler, false);

        // Message from server...
        if (iframeId.contentDocument) {
            content = iframeId.contentDocument.body.innerHTML;
        } else if (iframeId.contentWindow) {
            content = iframeId.contentWindow.document.body.innerHTML;
        } else if (iframeId.document) {
            content = iframeId.document.body.innerHTML;
        }

        document.getElementById(div_id).innerHTML = content;

        // Del the iframe...
        setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
    }

    if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
    if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);

    // Set properties of form...
    form.setAttribute("target", "upload_iframe");
    form.setAttribute("action", action_url);
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("encoding", "multipart/form-data");

    // Submit the form...
    form.submit();

    document.getElementById(div_id).innerHTML = "Đang tải lên...";
}