$('#form').on('submit', (function(e){
    e.preventDefault()
    var username = $('#usernamefield').val()
    var password = $('#passwordfield').val()
    if(username === "admin"){
        if(password === "Admin123"){
            window.location.replace("library/html/main.html");
        }
    }
    else{
        $('#failedlogin').show()
    }
}));