function loadBBGroupData() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://steamcommunity.com/groups/BladeBrothers/memberslistxml/?xml=1", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log (xhr.responseText);
            //document.querySelector(".listxmp").innerHTML = xhr.responseText;
        }
    }

    xhr.send();
}