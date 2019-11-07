var data = {
    profile: {
        psid: '2159017564186704',
        first_name: 'Trần',
        last_name: 'Ngọc Huy',
        profile_pic: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/67653459_1119818788210633_7907287598006009856_n.jpg?_nc_cat=100&_nc_oc=AQmyJxubYjEwNe5mssm71hlABYlyr5OVCdL3pwdqly6rh3wI0cDqH9kZ6RL1a4KXIRs&_nc_ht=scontent.fdad3-3.fna&oh=d03787b167e329d321f12282cafb7632&oe=5E445EC0'
    },
    retrieving_labels_by_psid: new Array,
    get_all_labels: new Array
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
routers.get_all_labels(labels => {
    data.get_all_labels = labels;
    updateContent();
});
routers.retrieving_labels_by_psid(data.profile.psid, (labels) => {
    data.retrieving_labels_by_psid = labels;
    updateContent();
})
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

    });
    $('.unassociate_label').click(function () {
    });
    $('#search').keyup(function () {
        var keyword = this.value;
        var html = '';
        var { item, box } = element.get_all_labels;
        var condition = new RegExp(keyword, 'i');
        var result = new Array;
        data.get_all_labels.forEach(label => {
            if (label.name.search(condition) != -1) {
                result.push(label)
            }
        });
        result.forEach(label => {
            html += item.replace(/NAME/g, label.name).replace('ID', label.id);
        })
        if (result.length) {
            box.innerHTML = html;

        } else {
            box.innerText = 'Không tìm thấy thẻ bạn yêu cầu...'
        }
    })

}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function () {
    MessengerExtensions.getContext('191786431454227',
        function success(thread_context) {
            data.profile.psid = thread_context.psid;
        },
        function error(err) {
        }
    );
};
