/*
*/
const endScoreButton = document.getElementById("end-score-button")
const rematchButton = document.getElementById("rematch-button")
const newGameButton = document.getElementById("new-game-button")
const backButton = document.getElementById("back-button")
const scoreList = document.getElementById("score-list")

endContainer.style.display = "none"

newGameButton.addEventListener('click', (event) => {
    endContainer.style.display = "none"    
    startContainer.style.display = "block"
})

backButton.addEventListener('click', (event) => {
    endContainer.style.display = "none"
    scoreContainer.style.display = 'none'
    startContainer.style.display = "block"
})

endScoreButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SCORES")
    getPlayers()
    endContainer.style.display = 'none'
    scoreContainer.style.display = 'block'
})


let playersList = []
const displayScores = (arr) => {
    scoreList.innerHTML = ''
    let limitArr = arr.slice(0,10)
    limitArr.forEach(player => {
        let name = player.username.slice(0,12).toUpperCase()
        for ( let i = name.length; i < 12; i++ ){
            name = name + '-'
        }
        let points = player.points.toString().slice(0,4) 
        for ( let i = points.length; i < 4; i++ ){
            points = '-' + points
        }
        let line = name + '----------' + points
        // console.log(line)
        let liTag = document.createElement("li")
        liTag.innerHTML = line
        scoreList.appendChild(liTag)
    })
}

const getPlayers = () => {
    fetch(playerURL)
    .then(res => res.json())
    .then(players => {
        playersList = []
        players.forEach(player => playersList.push(player))
        displayScores(playersList.sort((a , b) => (a.points > b.points) ? -1 : 1))
    })
}

// let testScoresArray = [{username: "chris", points: 5}, {username: "philipipipiiiii", points: 99}, {username: "christia", points: 100}, {username: "chris", points: 5000}, {username: "philipipipiiiii", points: 1}, {username: "christia", points: 10}]


// displayScores(testScoresArray)
// displayScores(playersList)

