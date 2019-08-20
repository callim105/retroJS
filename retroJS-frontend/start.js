// Initializes new canvas and instance of the Pong Class with canvas element 
const pongCanvas = document.getElementById('pong')
const pong = new Pong(pongCanvas)

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
pongCanvas.style.display = "none"
// startCanvas.style.display = "none"