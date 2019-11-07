var routers = {
    profile: function (callback) {
        $.get('/api/profile', {
            psid: data.profile.psid
        }, function (profile) {
            if (profile) {
                data.profile = profile;
                callback(profile);
            }
        });
    },
    get_all_labels: function (callback) {
        $.get('/api/get_all_labels', {}, function (labels) {
            callback(labels);
        });
    },
    retrieving_labels_by_psid: function (psid, callback) {
        $.get('/api/retrieving_labels_by_psid', {
            psid: psid
        }, function (labels) {
            if (labels) {
                callback(labels);
            }
        });
    },
    associate_label: function (id, callback) {
        $.post('/api/associate_label', {
            psid: data.profile.psid,
            id: id
        }, function (labels) {
            retrieving_labels_by_psid();
            callback(labels);
        });
    },
    unassociate_label: function (id, callback) {
        $.post('/api/associate_label', {
            psid: data.profile.psid,
            id: id
        }, function (labels) {
            retrieving_labels_by_psid();
            callback(labels);

        });
    }
}