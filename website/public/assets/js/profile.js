var routers = {
    profile: function (callback) {
        $.get('/api/profile', {
            event: 'profile',
            psid: data.profile.psid
        }, function (profile) {
            callback(profile);
        });
    },
    get_all_labels: function (callback) {
        $.get('/api/get_all_labels', {
            event: 'get_all_labels',
        }, function (labels) {
            callback(labels);
        });
    },
    retrieving_labels_by_psid: function (psid, callback) {
        $.get('/api/retrieving_labels_by_psid', {
            event: 'retrieving_labels_by_psid',
            psid: psid
        }, function (labels) {
            if (labels) {
                callback(labels);
            }
        });
    },
    associate_label: function (id, name, callback) {
        $.post('/api/associate_label', {
            event: 'associate_label',
            psid: data.profile.psid,
            id: id,
            name: name
        }, function (docs) {
            callback(docs);
        });
    },
    unassociate_label: function (id, name, callback) {
        $.post('/api/unassociate_label', {
            event: 'unassociate_label',
            psid: data.profile.psid,
            id: id,
            name: name
        }, function (docs) {
            callback(docs);

        });
    },
    err: function (err) {
        $.post('/api/err', err, function (docs) {
            callback(docs);
        });
    },
    log: function (log) {
        $.post('/api/log', err, function (docs) {
            callback(docs);
        });
    }
};
(function (d, s, id) {
    routers.log('loading facebook sdk');
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

var data = {
    profile: {
        psid: String,
        first_name: 'Người dùng',
        last_name: 'Loa Loa Education',
        profile_pic: '/assets/img/no-avatar.png'
    },
    retrieving_labels_by_psid: [
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
    ],
    showLabels: [
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
        data.showLabels.forEach(label => {
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


        if (result.length) {
            data.showLabels = result;
            updateContent();
        } else {
            box.innerText = 'Không tìm thấy thẻ bạn yêu cầu...'
        }
    })

}

routers.get_all_labels(labels => {
    data.get_all_labels = labels;
    data.showLabels = labels;

    updateContent();
});
window.extAsyncInit = function () {

    routers.log('done loading');

    MessengerExtensions.getSupportedFeatures(function success(result) {
        let features = result.supported_features;
        routers.log(result);
    }, function error(err) {
        routers.err(err)
    });

    MessengerExtensions.getContext('191786431454227',
        function success(thread_context) {
            routers.log(thread_context);
            data.profile.psid = thread_context.psid;
            routers.retrieving_labels_by_psid(data.profile.psid, (labels) => {
                data.retrieving_labels_by_psid = labels;
                updateContent();
            })
            routers.profile(profile => {
                data.profile = profile;
                updateContent();

            })

        },
        function error(err) {
            routers.err(err)
        }
    );
};
