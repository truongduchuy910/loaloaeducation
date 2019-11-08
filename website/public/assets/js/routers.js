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
    }
}