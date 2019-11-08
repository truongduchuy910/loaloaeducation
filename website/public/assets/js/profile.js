routers.get_all_labels(labels => {
    data.get_all_labels = labels;
    data.showLabels = labels;

    updateContent();
});
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
            routers.profile(profile => {
                data.profile = profile;
            })
            routers.retrieving_labels_by_psid(data.profile.psid, (labels) => {
                data.retrieving_labels_by_psid = labels;
                updateContent();
            })
        },
        function error(err) {
        }
    );
};