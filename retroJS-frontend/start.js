// Initializes new canvas and instance of the Pong Class with canvas element 

const canvas = document.getElementById('pong')
const pong = new Pong(canvas)
canvas.style.display = "none"
const startForm = document.getElementById("start-form")
const playButton = startForm.querySelector("input[type=submit]")
const startContainer = document.getElementById("start-container")

startForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    canvas.style.display = "block"
    startContainer.style.display = "none"
    
})

// const startCanvas = document.getElementById("start")
// const startctx = startCanvas.getContext("2d")

// startctx.fillStyle = "black"
// startctx.fillRect(0, 0, startCanvas.width, startCanvas.height)

// const title = (title)=>{
//     startctx.font = "100px Georgia"
//     startctx.fillStyle = "white"
//     startctx.textAlign = "center"
//     startctx.fillText(title, (startCanvas.width/2), (startCanvas.height/3))
// }

// title("PONG")

// startCanvas.style.display = "none"