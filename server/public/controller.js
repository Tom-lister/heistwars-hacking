const socket = io('ws://localhost:3500')
var room = "heist";

function sendResponse(e) {
    e.preventDefault()
    socket.emit('message',"RESPONSE")
}

const p = document.getElementById("request")

const responseButton = document.getElementById("respond")
responseButton.addEventListener('click', sendResponse)

// Listen for requests
socket.on('message', (data) => {
    p.innerHTML = data
})

socket.emit("join",room);