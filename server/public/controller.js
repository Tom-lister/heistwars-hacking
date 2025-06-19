//const socket = io('ws://localhost:3500/')
const socket = io('https://heistwars-hacking.onrender.com')
var room = "heist";

function sendResponse(message) {
    socket.emit('message', message)
}

const p = document.getElementById("request")
const img = document.getElementById("image")

const responseButton = document.getElementById("respond")

responseButton.addEventListener('click', () => { sendResponse("RESPONSE") })

window.addEventListener('paste', e => {
    const imageFile = e.clipboardData.files[0];
    var fileReader = new FileReader();

    fileReader.onloadend = function (event) {
        // Send an image event to the socket
        var image = event.target.result
        img.src = image;
        socket.emit("image", image);
        p.innerHTML = "RESPONSE"
        document.body.style.backgroundColor = "white";
    };

    // Read file
    fileReader.readAsDataURL(imageFile);
});

// Listen for requests
socket.on('message', (data) => {
    console.log(data);
    p.innerHTML = data
    if (data == "RESPONSE") {
        document.body.style.backgroundColor = "white";
    } else if (data == "SUCCESS") {
        document.body.style.backgroundColor = "green";
    } else if (data == "ACTIVATION") {
        document.body.style.backgroundColor = "red";
    } else if (data== "FAILURE") {
        p.innerHTML = "Guessed code incorrectly"
        document.body.style.backgroundColor = "#ffcfcf"
    } else {
        document.body.style.backgroundColor = "#ffef9e";
    }
})

socket.emit("join", room);