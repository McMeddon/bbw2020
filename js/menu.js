function copyToClipboard(id, info) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alertify.success(info + " : " + copyText.value);
}

function rotate(id) {
    var element = document.getElementById(id);
    element.classList.toggle("rotated");
}
