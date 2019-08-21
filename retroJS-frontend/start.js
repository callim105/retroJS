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

// Hiding Start Elements
canvas.style.display = "none"
scoreContainer.style.display = "none"

// let fetchContent = {
//     method: "POST",
//     headers: { "content-type": "application/json", "accept": "application/json" },
//     body: JSON.stringify(formData)
// }
let players
playButton.addEventListener("click",(event)=>{
    event.preventDefault()
    players = []
    
    //this is disgusting, pls fix.
    fetch(playerURL, {
        method: "POST",
        headers: { "content-type": "application/json", "accept": "application/json" },
        body: JSON.stringify({
            username: playerOneInput.value
        })
    })
    .then(res => res.json())
    .then(player => {
        players.push(player)
        // Post Fetch Player 2 w/ Post fetch of new game
        fetch(playerURL, {
            method: "POST",
            headers: { "content-type": "application/json", "accept": "application/json" },
            body: JSON.stringify({
                username: playerTwoInput.value
            })
        })
        .then(res => res.json())
        .then(player => {
            players.push(player)
            fetch(gameURL, {
                method: "POST",
                headers: { "content-type": "application/json", "accept": "application/json" },
                body: JSON.stringify({
                    player_1_id: players[0].id,
                    player_2_id: players[1].id
                })
            })
            .then(res => res.json())
            .then(player => {
                const pong = new Pong(canvas, endContainer, players[0], players[1])
            })
        })
    })


    
    canvas.style.display = "block"
    startContainer.style.display = "none"
    
    
    // fetch post to Games with both player id's
    // fetch(gameURL, {
    //     method: "POST",
    //     headers: { "content-type": "application/json", "accept": "application/json" },
    //     body: JSON.stringify({
    //         player_1_id: idArray[0],
    //         player_2_id: idArray[1]
    //     })
    // })
    // .then(res => res.json())
    // .then(console.log)

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
})