var data = [
    {
        time: "2019-11-22T04:11:43.042Z",
        labels: ['{ "name": "Đang tải...", "id": "2694308623944813"}'],
        _id: '5dd75536fb79ec3699b0cccb',
        user: 'Đang tải...',
        content: 'Đang tải...',
    },
    {
        time: "2019-11-22T04:11:43.042Z",
        labels: ['{ "name": "Đang tải...", "id": "2694308623944813"}'],
        _id: '5dd75536fb79ec3699b0cccb',
        user: 'Đang tải...',
        content: 'Đang tải...',
    }
]
var routers = {
    get_all_broadcast: (callback) => {
        $.get('/api/get_all_broadcast', {
        }, function (broadcasts) {
            callback(broadcasts);
        });
    }
}
var element = {
    manage: {
        box: document.getElementById('manage-box'),
        item: document.getElementById('manage-item').outerHTML
    }
}
function updateContent() {
    var html = '';
    data.forEach(br => {
        var labels = '';
        br.labels.forEach(label => {
            labels += JSON.parse(label).name;
        })
        var date = new Date(br.time).toLocaleDateString();
        html += element.manage.item.replace(/DATE/g, date).replace(/LABEL/g, labels).replace(/CONTENT/g, br.content)
    })
    element.manage.box.innerHTML = html;
}
updateContent();
routers.get_all_broadcast(broadcasts => {
    data = broadcasts.reverse();
    console.log(data)
    updateContent();
})

