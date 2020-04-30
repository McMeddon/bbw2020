/** TODO comment functions */


/*CLASSES */

class Streamer {
    constructor(dataid, data) {
        this.Dataid = dataid;
        this.Viewers = 0;
        this.Online = false;
        this.Name = data.Name;
        this.Name = data.DisplayName;
        this.DisplayName = data.DisplayName;
        this.Description = data.Description;
    }
}

/*END CLASSES */

/* GLOBAL VARS */

// get urlparam to set initial stream
const urlparam = getUrlParam("stream", "monstercat");

/*SET TWITCH STREAM PLAYER */
const options = {
    width: 854,
    height: 480,
    channel: urlparam,
    theme: "dark",
};
const embed = new Twitch.Embed("stream", options);

var streamers = new Array();
/* END GLOBAL VARS */

/* INIT SEQUENCE */
window.history.replaceState({}, document.title, "/" + "streams");

//render streams
db.collection("Streamer").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderStreamer(doc);
    });
    updateStreams();
});
//set update interval for streams
setInterval(updateStreams, 180000); //3 min
/* END INIT SEQUENCE */

/* FUNCTIONS */

function renderStreamer(doc) {
    let streamer = doc.data();
    streamers.push(new Streamer(doc.id, streamer));
    let ul = document.querySelector("#streamlist");
    let li = document.createElement("li");
    let button = document.createElement("button");
    let div = document.createElement("div");

    li.setAttribute('data-id', doc.id);
    li.id = streamer.Name;
    li.classList.add('streamlistitem');
    li.classList.add("offline");

    button.classList.add('tablinks');
    button.classList.add('button');
    button.onclick = function () {
        openInformationTab(event, doc.id);
        changeChannel(streamer.Name);
    };

    button.textContent = streamer.DisplayName;

    div.classList.add('liveicon');

    button.appendChild(div);

    li.appendChild(button);

    ul.appendChild(li);
}

function openInformationTab(evt, dataid) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab

    document.getElementById('StreamerTabTitle').innerText = streamers.find(x => x.Dataid === dataid).DisplayName;
    document.getElementById('StreamerTabDescription').innerText = streamers.find(x => x.Dataid === dataid).Description;
    document.getElementById('StreamerTabViewers').innerHTML = streamers.find(x => x.Dataid === dataid).Viewers;
    document.getElementById('StreamerTab').style.display = "block";
    evt.currentTarget.className += " active";
}

function changeChannel(channel) {
    var player = embed.getPlayer();
    player.setChannel(channel);
}

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
        if (ul.childNodes[i].nodeName === 'LI');
            getTwitchChannelStatus(ul.childNodes[i].id);
    }
    orderStreams(ul);
}

function orderStreams(ul) {
    var newUL = ul.cloneNode(false);

    var lis = [];
    for (let i = ul.childNodes.length; i--;) {
        if (ul.childNodes[i].nodeName === 'LI')
            if (ul.childNodes[i].classList.contains("online"))
                lis.push(ul.childNodes[i]);
    }
    for (let i = ul.childNodes.length; i--;) {
        if (ul.childNodes[i].nodeName === 'LI')
            if (!ul.childNodes[i].classList.contains("online"))
                lis.push(ul.childNodes[i]);
    }

    for (let i = 0; i < lis.length; i++)
        newUL.appendChild(lis[i]);
    ul.parentNode.replaceChild(newUL, ul);
}

function toggleOnline(el, live, viewers) {
    if ((el.classList.contains("offline") && live) || (el.classList.contains("online") && !live)) {
        el.classList.toggle("online");
        el.classList.toggle("offline");
    }
    streamers.find(x => x.Dataid === el.getAttribute('data-id')).Viewers = viewers;
    streamers.find(x => x.Dataid === el.getAttribute('data-id')).Online = live;
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
            var live = false;
            var viewers = 0;
            if (typeof objChannel.data[0] !== "undefined") {
                live = objChannel.data[0].type;
                viewers = objChannel.data[0].viewer_count;
            }
            //get listitem
            var list_element = document.getElementById(channel);
            toggleOnline(list_element, live, viewers);
        }
    })
}

function getStatus(userid, callback) {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function (event) {
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