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
            document.getElementById('psid').innerText = psid;
            console.log('loading');

        },
        function error(err) {
            console.log(err);
        }
    );
};
var routers = {
    getUser: function (psid) {
        $.post('/messenger/getUser/' + psid, (data) => {
        });
    }
}
