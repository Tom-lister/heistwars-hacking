//const socket = io('ws://localhost:3500/')
const socket = io('https://heistwars-hacking.onrender.com')
var room = "heist";

function sendResponse(e) {
    e.preventDefault()
    socket.emit('message',"RESPONSE")
    console.log("Here")
}

const p = document.getElementById("request")
const img = document.getElementById("image")

const responseButton = document.getElementById("respond")
responseButton.addEventListener('click', sendResponse)

window.addEventListener('paste', e => {
  const imageFile = e.clipboardData.files[0];
var fileReader = new FileReader();

fileReader.onloadend = function (event) {
    // Send an image event to the socket
    var image = event.target.result
    img.src = image;
    socket.emit("image", image);
};

// Read file
fileReader.readAsDataURL(imageFile);
});

// Listen for requests
socket.on('message', (data) => {
    p.innerHTML = data
})

socket.emit("join",room);