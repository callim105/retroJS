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

// let fetchContent = {
//     method: "POST",
//     headers: { "content-type": "application/json", "accept": "application/json" },
//     body: JSON.stringify(formData)
// }

playButton.addEventListener("click",(event)=>{
    event.preventDefault()
    let idArray = []
    let playersArray = [playerOneInput, playerTwoInput]
    // playersArray.forEach(player => {
        // Post Fetch Player 1
        fetch(playerURL, {
            method: "POST",
            headers: { "content-type": "application/json", "accept": "application/json" },
            body: JSON.stringify({
                username: playerOneInput.value
            })
        })
        .then(res => res.json())
        .then(player => idArray.push(player.id))

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
            idArray.push(player.id)
            fetch(gameURL, {
                method: "POST",
                headers: { "content-type": "application/json", "accept": "application/json" },
                body: JSON.stringify({
                    player_1_id: idArray[0],
                    player_2_id: idArray[1]
                })
            })
            .then(res => res.json())
            .then(console.log)
        })
    // })
    
    canvas.style.display = "block"
    startContainer.style.display = "none"
    const pong = new Pong(canvas, endContainer)
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
})

settingsButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SETINGS")
})