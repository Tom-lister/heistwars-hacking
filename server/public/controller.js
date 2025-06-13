const socket = io('ws://localhost:3500/') //https://heistwars-hacking.onrender.com
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
  console.log(e.clipboardData.files);
});

// Listen for requests
socket.on('message', (data) => {
    p.innerHTML = data
})

socket.emit("join",room);