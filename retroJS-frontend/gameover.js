/*
After the game ends with one player at 10 pts
Then we want the canvas display value = 'none'
Then we  want a black screen with 
GAME OVER
WINNER: <username> 
Rematch? <button> New Game? <button>
^New Game with same users
*/
const endScoreButton = document.getElementById("end-score-button")
const rematchButton = document.getElementById("rematch-button")
const newGameButton = document.getElementById("new-game-button")

endContainer.style.display = "none"

newGameButton.addEventListener('click', (event) => {
    endContainer.style.display = "none"    
    startContainer.style.display = "block"
})

endScoreButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("SCORES")
})