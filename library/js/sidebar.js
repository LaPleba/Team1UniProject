$('#logout').on('click', (function (e) {
    e.preventDefault()
    window.location.replace("login.html");
}));

function sidebar_open() {
    document.getElementById("sidebar").style.display = "block";
}

function sidebar_close() {
    document.getElementById("sidebar").style.display = "none";
}