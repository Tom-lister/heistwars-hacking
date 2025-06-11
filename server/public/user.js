const socket = io('ws://localhost:3500')

const optionsDiv = document.getElementById("options");
const loadingDiv = document.getElementById("loading");

function requestPlaySound(e) {
    e.preventDefault()
    socket.emit('message','playSound')
    showLoading()
}

function requestGetSnapshot(e) {
    e.preventDefault()
    socket.emit('message','getSnapshot')
    showLoading()
}

function showLoading(show = true) {
    optionsDiv.style.display = show ? "none" : "flex";
    loadingDiv.style.display = show ? "inline" : "none";
}

const soundButton = document.getElementById("playSound")
soundButton.addEventListener('click', requestPlaySound)

const cameraButton = document.getElementById("getSnapshot")
cameraButton.addEventListener('click', requestGetSnapshot)

// Receive response
socket.on('message', (data) => {
    if (data == "RESPONSE") {
    console.log(2);
    showLoading(false)
    }
})