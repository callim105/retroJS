// Initializes new canvas and instance of the Pong Class with canvas element 
const canvas = document.getElementById('pong')
const endContainer = document.getElementById("end-container")

const startForm = document.getElementById("start-form")
const playButton = document.getElementById("play-button")
const startContainer = document.getElementById("start-container")
const playerOneInput = document.getElementById("p1username")
const playerTwoInput = document.getElementById("p2username")
const scoreButton = document.getElementById("score-button")
const settingsButton = document.getElementById("settings-button")

// Hiding Start Elements
canvas.style.display = "none"

playButton.addEventListener("click",(event)=>{
    event.preventDefault()
    console.log(playerOneInput.value)
    console.log(playerTwoInput.value)
    canvas.style.display = "block"
    startContainer.style.display = "none"
    const pong = new Pong(canvas, endContainer)
})

scoreButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SCORES")
})

settingsButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SETINGS")
})