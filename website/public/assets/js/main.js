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
            var psid = thread_context.psid;
            $.get('/api/profile', {
                psid: psid
            }, function (profile) {
                if (profile) {
                    document.getElementById('first_name').innerText = profile.first_name;
                    document.getElementById('last_name').innerText = profile.last_name;
                    document.getElementById('profile_pic').src = profile.profile_pic;
                }
            });
        },
        function error(err) {
        }
    );
};
