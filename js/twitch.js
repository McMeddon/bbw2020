function getUrlParam(parameter, defaultvalue) {
    var urlparameter;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    if (urlparameter === undefined)
        urlparameter = defaultvalue
    return urlparameter;
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function updateStreams() {
    var ul = document.getElementById('streamlist')

    for (let i = ul.childNodes.length; i--;) {
        if (ul.childNodes[i].nodeName === 'LI')
            getTwitchChannelStatus(ul.childNodes[i].id);
    }
    orderStreams(ul);
}

function toggleOnline(el, live) {
    if ((el.classList.contains('offline') && live) || (el.classList.contains('online') && !live)) {
        el.classList.toggle('online');
        el.classList.toggle('offline');
    }
}

function orderStreams(ul) {
    var new_ul = ul.cloneNode(false);

    var lis = [];
    for (let i = ul.childNodes.length; i--;) {
        if (ul.childNodes[i].nodeName === 'LI')
            if (ul.childNodes[i].classList.contains('online'))
                lis.push(ul.childNodes[i]);
    }
    for (let i = ul.childNodes.length; i--;) {
        if (ul.childNodes[i].nodeName === 'LI')
            if (!ul.childNodes[i].classList.contains('online'))
                lis.push(ul.childNodes[i]);
    }

    for (let i = 0; i < lis.length; i++)
        new_ul.appendChild(lis[i]);
    ul.parentNode.replaceChild(new_ul, ul);
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
            //get listitem
            var list_element = document.getElementById(channel);
            toggleOnline(list_element,live);
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