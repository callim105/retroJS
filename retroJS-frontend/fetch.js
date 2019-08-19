const gameURL = 'http://localhost:3000/games'
const playerURL = 'http://localhost:3000/players'
let player1name = document.getElementById("p1ID")
let player2name = document.getElementById("p2ID")
let allGamesArray = []

const newGame = ()=>{
    fetch(gameURL, {
        method: "POST",
        headers:{
            "content-type":"application/json",
            "accept":"application/json"
        },
        body:JSON.stringify({
            player_1_id: 1,
            player_2_id: 2
        })
    })
    .then(res => res.json())
    .then(console.log)
}
// takes player id
const updateGame = ()=>{
    fetch(gameURL + '/' + 7, {
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "accept":"application/json"
        },
        body:JSON.stringify({
            p1_score: 10,
            p2_score: 3,
            winner: 1
        })
    })
    .then(res => res.json())
    .then(console.log)
}
// player_1_obj = {
//     id: 1,
//     username: steave,
//     wins: 2,
//     losses: 51,
//     points: 78
// }

const updatePlayer = () => {
    let game = allGamesArray.slice(-1)[0]
    let isWinnerP1 = Number(game.winner) === Number(game.player_1_id)
    let isWinnerP2 = Number(game.winner) === Number(game.player_2_id)
    
    let newP1WinTotal = isWinnerP1 ? game.player_1.wins + 1 : game.player_1.wins
    let newP1LossTotal = isWinnerP2 ? game.player_1.losses + 1 : game.player_1.losses
    let newP1PointTotal = game.p1_score + game.player_1.points
    let newP2WinTotal = isWinnerP2 ? game.player_2.wins + 1 : game.player_2.wins
    let newP2LossTotal = isWinnerP1 ? game.player_2.losses + 1 : game.player_2.losses
    let newP2PointTotal = game.p2_score + game.player_2.points
    // debugger
    
    fetch(playerURL + '/' + game.player_1_id, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            wins: newP1WinTotal,
            losses: newP1LossTotal, 
            points: newP1PointTotal
        })
    })
    .then(res => res.json())
    .then(json => console.log(json))

    fetch(playerURL + '/' + game.player_2_id, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            wins: newP2WinTotal,
            losses: newP2LossTotal, 
            points: newP2PointTotal
        })
    })
    .then(res => res.json())
    .then(json => console.log(json))
}

const getPlayers = () => {
    fetch(playerURL)
    .then(res => res.json())
    .then(console.log)
}
const getGames = ()=>{
    fetch(gameURL)
    .then(res => res.json())
    // .then(games => console.log(games))
    .then(games => games.forEach(game => {
        allGamesArray.push(game)
    }))
}
const fetchInit = () => {
    getGames()
    getPlayers()
}
fetchInit()