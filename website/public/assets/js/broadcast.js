var data = {
    labels: new Array,
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
        }, {
            id: 'đang tải...',
            name: 'đang tải...'
        },
        {
            id: 'đang tải...',
            name: 'đang tải...'
        }, {
            id: 'đang tải...',
            name: 'đang tải...'
        }, {
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
    get_all_labels: {
        box: document.getElementById('get_all_labels'),
        items: document.getElementsByClassName('get_all_labels')[0].outerHTML
    },
    labels: {
        box: document.getElementById('labels'),
        items: document.getElementsByClassName('labels')[0].outerHTML
    },
    choose: document.getElementById('choose')
}

var routers = {
    get_all_labels: function (callback) {
        $.get('/api/get_all_labels', {
            event: 'get_all_labels',
        }, function (labels) {
            callback(labels);
        });
    },
    err: function (err) {
        $.post('/api/err', err, function (docs) {
            callback(docs);
        });
    }
}
function contentUpdate() {
    var html = '';
    data.get_all_labels.slice(0, 5).forEach(label => {
        html += element.get_all_labels.items.replace(/NAME/g, label.name).replace(/ID/g, label.id);
    })
    element.get_all_labels.box.innerHTML = html;
    html = '';
    data.labels.forEach(label => {
        html += element.labels.items.replace(/NAME/g, label.name).replace(/ID/g, label.id);
    })
    if (html == '') {
        element.labels.box.innerHTML = '<div class="alert alert-warning" role="alert">Bạn chọn tạo thẻ nào cả</div>'
    } else {
        element.labels.box.innerHTML = html;
    }
    var temp = new Array;
    data.labels.forEach(label => {
        temp.push(label.id);
    })
    choose.value = temp;
    $('.choose').click(function () {
        var name = this.getAttribute('label');
        var id = this.getAttribute('id');
        var check = true;
        data.labels.forEach(label => {
            if (label.id == id) {
                check = false;
            }
        })
        if (check) {
            data.labels.push({
                id: id,
                name: name
            })
            contentUpdate();
        }

    })
    $('.remove').click(function () {
        var name = this.getAttribute('label');
        var id = this.getAttribute('id');
        var index = 0;
        console.log(id)
        while (index < data.labels.length && data.labels[index].id != id) index++;
        console.log(index);
        if (index != data.labels.length) {
            data.labels = data.labels.slice(0, index).concat(data.labels.slice(index + 1));

        }
        contentUpdate();
    })
}
routers.get_all_labels(labels => {
    data.get_all_labels = labels;
    contentUpdate();
})
contentUpdate();
