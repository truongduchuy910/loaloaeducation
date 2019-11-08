var data = {
    profile: {
        psid: String,
        first_name: 'Người dùng',
        last_name: 'Loa Loa Education',
        profile_pic: '/assets/img/no-avatar.png'
    },
    retrieving_labels_by_psid: [
        {
            id: '123456',
            name: 'thẻ_1'
        },
        {
            id: '123456',
            name: 'thẻ_3'
        }, {
            id: '123456',
            name: 'thẻ_4'
        }
    ],
    showLabels: [
        {
            id: '123456',
            name: 'thẻ_5'
        },
        {
            id: '123456',
            name: 'thẻ_6'
        }, {
            id: '123456',
            name: 'thẻ_7'
        }
    ],
    get_all_labels: [
        {
            id: '123456',
            name: 'thẻ_5'
        },
        {
            id: '123456',
            name: 'thẻ_6'
        }, {
            id: '123456',
            name: 'thẻ_7'
        }
    ]
};
var element = {
    profile: {
        name: document.getElementById('name'),
        profile_pic: document.getElementById('profile_pic')
    },
    retrieving_labels_by_psid: {
        box: document.getElementById('retrieving_labels_by_psid'),
        item: document.getElementsByClassName('retrieving_labels_by_psid')[0].outerHTML
    },
    get_all_labels: {
        box: document.getElementById('get_all_labels'),
        item: document.getElementsByClassName('get_all_labels')[0].outerHTML
    }

}
updateContent();
function updateContent() {

    if (data.profile) {
        var { name, profile_pic } = element.profile;
        name.innerText = data.profile.first_name + ' ' + data.profile.last_name;
        profile_pic.src = data.profile.profile_pic;
    }
    if (data.retrieving_labels_by_psid) {
        var { item, box } = element.retrieving_labels_by_psid;
        var html = '';
        data.retrieving_labels_by_psid.forEach(label => {
            html += item.replace(/NAME/g, label.name).replace('ID', label.id);
        })
        box.innerHTML = html;
    }
    if (data.get_all_labels) {
        var { item, box } = element.get_all_labels;
        var html = '';
        data.get_all_labels.forEach(label => {
            html += item.replace(/NAME/g, label.name).replace('ID', label.id);
        })
        box.innerHTML = html;
    }
    //EVENT LISTENING
    $('.associate_label').click(function () {
        var id = this.id;
        var name = this.name;
        routers.associate_label(id, name, label => {
            routers.retrieving_labels_by_psid(data.profile.psid, labels => {
                data.retrieving_labels_by_psid = labels;
                updateContent();
            })
        })
    });
    $('.unassociate_label').click(function () {
        var id = this.id;
        var name = this.name;
        routers.unassociate_label(id, name, label => {
            routers.retrieving_labels_by_psid(data.profile.psid, labels => {
                data.retrieving_labels_by_psid = labels;
                updateContent();
            })
        })
    });
    $('#search').keyup(function () {
        var keyword = this.value;
        var condition = new RegExp(keyword, 'i');
        var result = new Array;
        data.get_all_labels.forEach(label => {
            if (label.name.search(condition) != -1) {
                result.push(label)
            }
        });

        var { item, box } = element.get_all_labels;
        var html = '';
        data.get_all_labels.forEach(label => {
            html += item.replace(/NAME/g, label.name).replace('ID', label.id);
        })
        if (result.length) {
            box.innerHTML = html;

        } else {
            box.innerText = 'Không tìm thấy thẻ bạn yêu cầu...'
        }
    })

}
