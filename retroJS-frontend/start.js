// Initializes new canvas and instance of the Pong Class with canvas element 
const canvas = document.getElementById('pong')
const endContainer = document.getElementById("end-container")

const gameURL = 'http://localhost:3000/games'
const playerURL = 'http://localhost:3000/players'

const startForm = document.getElementById("start-form")
const playButton = document.getElementById("play-button")
const startContainer = document.getElementById("start-container")
const scoreContainer = document.getElementById("score-container")
const playerOneInput = document.getElementById("p1username")
const playerTwoInput = document.getElementById("p2username")
const scoreButton = document.getElementById("score-button")
const settingsButton = document.getElementById("settings-button")
const scoreFromSettings = document.getElementById("scoresFromSettings")
// Hiding Start Elements
canvas.style.display = "none"
scoreContainer.style.display = "none"

let players
playButton.addEventListener("click", async (event)=>{
    event.preventDefault()
    players = []
    soundObj.background.volume = 0.2
    soundObj.background.play()
    try{
    let playerOne = await fetch(playerURL, {
        method: "POST",
        headers: { "content-type": "application/json", "accept": "application/json" },
        body: JSON.stringify({
            username: playerOneInput.value
        })
    })
    .then(res => res.json())

    // Post Fetch Player 2 w/ Post fetch of new game
    let playerTwo = await fetch(playerURL, {
        method: "POST",
        headers: { "content-type": "application/json", "accept": "application/json" },
        body: JSON.stringify({
            username: playerTwoInput.value
        })
    })
    .then(res => res.json())
                            
    players.push(playerOne)
    players.push(playerTwo)
    // Use fetched players to POST new game instance
    let game = await fetch(gameURL, {
        method: "POST",
        headers: { "content-type": "application/json", "accept": "application/json" },
        body: JSON.stringify({
            player_1_id: players[0].id,
            player_2_id: players[1].id
        })
    })
    .then(res => res.json())
    
    let pong = new Pong(canvas, endContainer, players[0], players[1], game, settingsObj, soundObj)
    
    canvas.style.display = "block"
    startContainer.style.display = "none"
    } catch(err){console.error(err)}
})

scoreButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SCORES")
    startContainer.style.display = 'none'
    scoreContainer.style.display = 'block'
    getPlayers()
})

settingsButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SETINGS")
    startContainer.style.display = 'none'
    settingsContainer.style.display = 'block'
})

scoreFromSettings.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SCORES")
    settingsContainer.style.display = "none"
    scoreContainer.style.display = 'block'
    getPlayers()
})