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

const audioContainer = document.getElementById("audioPresetContainer")
const audioSelector = document.getElementById("audio-preset")

//Complete settings object to send into Pong argument
let settingsObj = {}

// Sound effects
let hitsound = new Audio()
let wallbouncesound = new Audio()
let winSound = new Audio()
let backgroundMusic = new Audio()
let scoreSound = new Audio()
let hitStr
let wallBounceStr
let winStr
let backgroundStr
let scoreSoundStr

let soundObj = {
    hit: hitsound,
    wallBounce: wallbouncesound,
    win: winSound,
    background: backgroundMusic,
    score: scoreSound
}
// const selectAudio = (hitStr, wallBounceStr, winStr, backgroundStr, scoreSoundStr) => {
const selectAudio = () => {
    switch (audioSelector.value) {
        case 'default':
            hitStr = './audio/default/Beep1.wav'
            wallBounceStr ='./audio/default/Beep2.wav'
            winStr = './audio/default/FFVII_WIN.mp3'
            backgroundStr = './audio/default/Tetris_background.mp3'
            scoreSoundStr = './audio/mario/Mario-coin-sound.mp3'
            break;
        case 'mario':
            hitStr = './audio/default/Beep1.wav'
            wallBounceStr ='./audio/default/Beep2.wav'
            winStr = './audio/mario/Z01 Victory (Super Mario Bros.).mp3'
            backgroundStr = './audio/mario/03 - Super Mario Bros 2 Main Theme.mp3'
            // backgroundStr = './audio/mario/05 - Magic Doorway.mp3'
            scoreSoundStr = './audio/mario/Mario-coin-sound.mp3'
            break;
        case 'zelda':
            hitStr = './audio/zelda/WW_Rupee_Bounce.wav'
            wallBounceStr ='./audio/zelda/08 - Item Catch.mp3'
            winStr = './audio/zelda/Z03 Victory (The Legend of Zelda).mp3'
            backgroundStr = './audio/zelda/C02 Main Theme (The Legend of Zelda).mp3'
            scoreSoundStr = './audio/zelda/WW_Get_Rupee.wav'
            break;
        case 'sonic':
            hitStr = './audio/default/Beep1.wav'
            wallBounceStr ='./audio/default/Beep2.wav'
            winStr = './audio/sonic/Z47 Victory (Sonic the Hedgehog).mp3'
            backgroundStr = './audio/sonic/U01 Green Hill Zone.mp3'
            // backgroundStr = './audio/sonic/U09 Live & Learn.mp3'
            scoreSoundStr = './audio/sonic/26f8b9_sonic_ring_sound_effect.mp3'
            break;
        
    }
    hitsound.src = hitStr;
    wallbouncesound.src = wallBounceStr
    winSound.src = winStr
    backgroundMusic.src = backgroundStr
    scoreSound.src = scoreSoundStr
}

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
    selectAudio()
}
checkSettings()
settingsSaveButton.addEventListener("click",()=> {
    console.log("hi")
    checkSettings()
    settingsContainer.style.display = "none"
    startContainer.style.display = "block"
})