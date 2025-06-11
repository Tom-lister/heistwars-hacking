const socket = io('ws://localhost:3500')

function sendResponse(e) {
    e.preventDefault()
    console.log(1);
    socket.emit('message',"RESPONSE")
}

const p = document.getElementById("request")

const responseButton = document.getElementById("respond")
responseButton.addEventListener('click', sendResponse)

// Listen for requests
socket.on('message', (data) => {
    p.innerHTML = data
})