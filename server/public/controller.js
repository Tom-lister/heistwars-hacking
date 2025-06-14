//const socket = io('ws://localhost:3500/')
const socket = io('https://heistwars-hacking.onrender.com')
var room = "heist";

function sendResponse(message) {
    socket.emit('message', message)
}

const p = document.getElementById("request")
const img = document.getElementById("image")

const responseButton = document.getElementById("respond")
const successButton = document.getElementById("success")
const failureButton = document.getElementById("failure")

responseButton.addEventListener('click', () => { sendResponse("RESPONSE") })
successButton.addEventListener('click', () => { sendResponse("SUCCESS") })
failureButton.addEventListener('click', () => { sendResponse("FAILURE") })

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
    if (["RESPONSE","SUCCESS","FAILURE"].includes(data)) {
        document.body.style.backgroundColor = "white";
    } else {
        document.body.style.backgroundColor = "#ffcfcf";
    }
})

socket.emit("join", room);