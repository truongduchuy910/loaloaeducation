var data = {
    profile: {
        psid: String,
        first_name: 'Người dùng',
        last_name: 'Loa Loa Education',
        profile_pic: '/img/no-avatar.png'
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