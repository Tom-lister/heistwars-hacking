//const socket = io('ws://localhost:3500/')
const socket = io('https://heistwars-hacking.onrender.com')
var room = "heist";

const optionsDiv = document.getElementById("options");
const loadingDiv = document.getElementById("loading");
const soundOptionsDiv = document.getElementById("soundOptions");
const imageDiv = document.getElementById("imageDiv");
const image = document.getElementById("image");

function requestPlaySound(e, message) {
    e.preventDefault()
    socket.emit('message',message)
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
    soundOptionsDiv.style.display = "none";
}

function showSoundOptions() {
    optionsDiv.style.display = "none";
    soundOptionsDiv.style.display = "flex";
}

const soundButton = document.getElementById("playSound")
soundButton.addEventListener('click', showSoundOptions)

for (var i = 0; i < soundOptionsDiv.children.length; i++) {
    const child = soundOptionsDiv.children[i];
    child.addEventListener('click', (e) => {requestPlaySound(e,"Play sound: " + child.innerHTML)})
}

const cameraButton = document.getElementById("getSnapshot")
cameraButton.addEventListener('click', requestGetSnapshot)

// Receive response
socket.on('message', (data) => {
    if (data == "RESPONSE") {
    showLoading(false)
    }
})

socket.on('image', (data) => {
    image.src = data
    showLoading(false)
    optionsDiv.style.display = "none";
    imageDiv.style.display = "block";

})

socket.emit("join",room);