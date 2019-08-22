const settingsContainer = document.getElementById("settings-container")
const ballSizeContainer = document.getElementById("ballSizeContainer")
const paddleSizeContainer = document.getElementById("paddleSizeContainer")
const difficultyContainer = document.getElementById("difficultyContainer")
const ballColorContainer = document.getElementById("ballColorContainer")
const paddleColorContainer = document.getElementById("paddleColorContainer")
const settingsSaveButton = document.getElementById("saveButton")

//second row
const ballColorSelector = document.getElementById("ballColor")
const paddleColorSelector = document.getElementById("paddleColor")
const backgroundColorSelector = document.getElementById("backgroundColor")
const netColorSelector = document.getElementById("netColor")




let ballSizeSelector = ballSizeContainer.querySelectorAll("input[type=radio]")
let paddleSizeSelector = paddleSizeContainer.querySelectorAll("input[type=radio]")
let difficultySelector = difficultyContainer.querySelectorAll("input[type=radio]")

//Complete settings object to send into Pong argument
let settingsObj = {}

//first row selectors
const selectBallSize = () => {
    
    ballSizeSelector.forEach(ballSizeRadio => {
        if(ballSizeRadio.checked){
            settingsObj.ballSize = ballSizeRadio.value
        }
    })
}

const selectPaddleSize = ()=>{
    paddleSizeSelector.forEach(paddleSizeRadio =>{
        if(paddleSizeRadio.checked){
            settingsObj.paddleLength = paddleSizeRadio.value
        }
    })
}

const selectDifficulty = ()=>{
    difficultySelector.forEach(difficultyRadio => {
        if(difficultyRadio.checked){
            settingsObj.difficulty = difficultyRadio.value
        }
    })
}


//Second row selectors
const selectBallColor = ()=>{
    settingsObj.ballColor = ballColorSelector.value
}

const selectPaddleColor = ()=>{
    settingsObj.paddleColor = paddleColorSelector.value 
}

const selectBackgroundColor = ()=>{
    settingsObj.backgroundColor = backgroundColorSelector.value 
}

const selectNetColor = ()=>{
    settingsObj.netColor = netColorSelector.value
}

const checkSettings = ()=>{
    selectBallSize()
    selectPaddleSize()
    selectDifficulty()
    selectBallColor()
    selectPaddleColor()
    selectBackgroundColor()
    selectNetColor()
}
checkSettings()
settingsSaveButton.addEventListener("click",()=> {
    console.log("hi")
    checkSettings()
    settingsContainer.style.display = "none"
    startContainer.style.display = "block"
})