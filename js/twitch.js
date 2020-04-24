function updateStreams() {
    var streams = ["monstercat", "handiofiblood", "meddontv"];
    for (let i = 0; i < streams.length; i++) {
       getTwitchChannelStatus(streams[i]);
    }
}

function getTwitchChannelStatus(channel) {
    var objUser;
    var objChannel;
    getTwitchUser(channel, function (x) {
        if (x === "error") {
            console.log(x);
        }
        else {
            objUser = JSON.parse(x);
        }
    })
    getStatus(objUser.data[0].id, function (x) {
        if (x === "error") {
            console.log(x);
        }
        else {
            objChannel = JSON.parse(x);
            var live;
            var viewers;
            if (typeof objChannel.data[0] !== 'undefined') {
                live = objChannel.data[0].type;
                viewers = objChannel.data[0].viewer_count;
            }
            var element = document.getElementById(channel);
            if (live === 'live') {
                element.classList.add("online");
                element.innerHTML = viewers;
            } else {
                element.classList.remove("online");
                element.innerHTML = "offline";
            }
        }
    })
}

function getStatus(userid, callback) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function (event) {
        if (request.status >= 200 && request.status < 300) {
            //console.log(request.responseText);
            callback(request.responseText);
        } else {
            //console.warn(request.statusText, request.responseText);
            callback("error");
        }
    });

    request.open("GET", "https://api.twitch.tv/helix/streams?user_id=" + userid, false);
    request.setRequestHeader("Client-ID", "tuchqw8ynn12oipzun9slynagyciqm");
    request.send(null);
}

function getTwitchUser(user, callback) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function (event) {
        if (request.status >= 200 && request.status < 300) {
            //console.log(request.responseText);
            callback(request.responseText);
        } else {
            //console.warn(request.statusText, request.responseText);
            callback("error");
        }
    });

    request.open("GET", "https://api.twitch.tv/helix/users?login=" + user, false);
    request.setRequestHeader("Client-ID", "tuchqw8ynn12oipzun9slynagyciqm");
    request.send(null);
}

function hold() {


    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            callback(request.response);
        }
    }

}