const settingsContainer = document.getElementById("settings-container")
const ballSizeContainer = document.getElementById("ballSizeContainer")
const paddleSizeContainer = document.getElementById("paddleSizeContainer")
const difficultyContainer = document.getElementById("difficultyContainer")
const ballColorContainer = document.getElementById("ballColorContainer")
const paddleColorContainer = document.getElementById("paddleColorContainer")

let ballSizeSelector = ballSizeContainer.querySelectorAll("input[type=radio]")
let settingsObj = {
}
const selectBallSize = () => {
    
    ballSizeSelector.forEach(ballSizeRadio => {
        if(ballSizeRadio.checked){
            settingsObj.ballSize = ballSizeRadio.value
        }
    })
}