//const socket = io('ws://localhost:3500/')
const socket = io('https://heistwars-hacking.onrender.com')
var room = "heist";

const optionsDiv = document.getElementById("options");
const loadingDiv = document.getElementById("loading");
const soundOptionsDiv = document.getElementById("soundOptions");
const imageDiv = document.getElementById("imageDiv");
const image = document.getElementById("image");
const codeDiv = document.getElementById("codeDiv")
const codeForm = document.getElementById("codeForm")

const soundButton = document.getElementById("playSound")
const cameraButton = document.getElementById("getSnapshot")
const codeButton = document.getElementById("checkCode")

const successBanner = document.getElementById("success")
const failureBanner = document.getElementById("failure")

function requestPlaySound(e, message) {
    e.preventDefault()
    socket.emit('message', message)
    showLoading()
}

function requestGetSnapshot(e) {
    e.preventDefault()
    socket.emit('message', 'getSnapshot')
    showLoading()
}

function submitCode(e) {
    e.preventDefault()
    const guess = document.getElementById("codeInput").value
    socket.emit('message', 'Code guess: ' + guess)
    showLoading();
}

function showLoading(show = true) {
    optionsDiv.style.display = show ? "none" : "flex";
    loadingDiv.style.display = show ? "inline" : "none";
    soundOptionsDiv.style.display = "none";
    codeDiv.style.display = "none";
}

function showSoundOptions() {
    optionsDiv.style.display = "none";
    soundOptionsDiv.style.display = "flex";
}

function showCodeEntry() {
    optionsDiv.style.display = "none";
    codeDiv.style.display = "flex";
}

soundButton.addEventListener('click', showSoundOptions)

for (var i = 0; i < soundOptionsDiv.children.length; i++) {
    const child = soundOptionsDiv.children[i];
    child.addEventListener('click', (e) => { requestPlaySound(e, "Play sound: " + child.innerHTML) })
}

cameraButton.addEventListener('click', requestGetSnapshot)

codeButton.addEventListener('click', showCodeEntry)
codeForm.addEventListener('submit', submitCode)

successBanner.children[3].addEventListener('click', (e) => {
    e.preventDefault();
    removeBanner();
})

failureBanner.children[3].addEventListener('click', (e) => {
    e.preventDefault();
    removeBanner();
})

// Receive response
socket.on('message', (data) => {
    if (data == "RESPONSE") {
        showLoading(false)
    } else if (data == "SUCCESS") {
        showSuccess()
    } else if (data == "FAILURE") {
        showFailure()
    }
})

socket.on('image', (data) => {
    image.src = data
    showLoading(false)
    optionsDiv.style.display = "none";
    imageDiv.style.display = "block";
    document.body.addEventListener("click", () => {
        optionsDiv.style.display = "flex";
        imageDiv.style.display = "none";
    }, { once: true })
})

function showSuccess() {
    showLoading(false)
    optionsDiv.style.display = "none";
    successBanner.style.display = "flex";
}

function showFailure() {
    showLoading(false)
    optionsDiv.style.display = "none";
    failureBanner.style.display = "flex";
}

function removeBanner() {
    optionsDiv.style.display = "flex";
    successBanner.style.display = "none";
    failureBanner.style.display = "none";
}

socket.emit("join", room);