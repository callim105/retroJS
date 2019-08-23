class Vec
{
    constructor(x = 0, y = 0)
    {
        this.x = x
        this.y = y
    }
}

class Rect 
{
    constructor(w, h)
    {
        this.pos = new Vec
        this.size = new Vec(w, h)
    }
    get left()
    { return this.pos.x - this.size.x / 2 }
    get right()
    { return this.pos.x + this.size.x / 2 }
    get top()
    { return this.pos.y - this.size.y / 2 }
    get bottom()
    { return this.pos.y + this.size.y / 2 }
}

class Ball extends Rect
{
    constructor(w, h)
    {
        super(w, h)
        this.vel = new Vec
    }
}

class Player extends Rect
{
    constructor(w, h) {
        super(w, h)
        this.score = 0
    }
}
class Pong
{
    constructor(canvas, endContainer, playerOne, playerTwo, game, settingsObj,soundObj /*= {ballSize, paddleLength, difficulty, ballColor, paddleColor, this.backgroundColor, netColor}*/)
    {
        //pong settings
        this.incrementalSpeed = Number(settingsObj.difficulty);
        this.ballSize = Number(settingsObj.ballSize);
        this.paddleLength = Number(settingsObj.paddleLength);
        
        // pong color settings
        this.ballColor = settingsObj.ballColor
        this.paddleColor = settingsObj.paddleColor
        this.backgroundColor = settingsObj.backgroundColor
        this.netColor = settingsObj.netColor

        // creates the canvas for pong
        this._canvas = canvas
        this._ctx = canvas.getContext('2d')
        
        // Creates the Ball element w/starting Position and Velocity
        this.ball = new Ball(this.ballSize, this.ballSize)

        // Assign random launch direction
        this.resetBall()
        this.ball.vel.x = Math.random() < .5 ? -200 : 200
        this.ball.vel.y = Math.random() < .5 ? -200 : 200

        // Creates the Players (Player 1: [0], Player 2: [1])
        this.players = [
            new Player(8, this.paddleLength),
            new Player(8, this.paddleLength),
        ]
        // Sets starting position of both players paddles
        this.players[0].pos.x = 40
        this.players[1].pos.x = this._canvas.width - 40
        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2
        })
        this.winner // boolean  value if true then Player 1 win, false then Player 2 win
        
        let myReq // used to control animation stop
        let lastTime // used for callback animation

        const callback = (millis) => {
            // millis is special word counts milliseconds since page load
            if (!this.winner) {
                if (lastTime) {
                    this.update((millis - lastTime) / 1000)
                }
                lastTime = millis
                myReq = requestAnimationFrame(callback)
                // End Game Functionality
                if (this.players[0].score === 5 || this.players[1].score === 5) {
                    soundObj.background.pause()
                    soundObj.win.play()
                    this.ball.vel.x = 0
                    this.ball.vel.y = 0
                    // Decides the winner
                    // this.winner? true, then player 1 wins
                    this.players[0].score > this.players[1].score ? this.winner = true : this.winner = false
                    //Assign game stats to player objects
                    cancelAnimationFrame(myReq)
                    
                    const patchData = async () => {
                        
                        try{
                            const playerOnePatch = await fetch(playerURL + "/" + playerOne.id,{
                                method:"PATCH",
                                headers:{
                                    "content-type":"application/json",
                                    "accept":"application/json"
                                },
                                body:JSON.stringify({
                                    wins: this.winner ? ++playerOne.wins : playerOne.wins,
                                    losses: this.winner ? playerOne.losses : ++playerOne.losses,
                                    points: playerOne.points + this.players[0].score
                                })
                            })
                        
                            const playerTwoPatch = await fetch(playerURL + "/" + playerTwo.id,{
                                method:"PATCH",
                                headers:{
                                    "content-type":"application/json",
                                    "accept":"application/json"
                                },
                                body:JSON.stringify({
                                    wins: this.winner ? playerTwo.wins : ++playerTwo.wins,
                                    losses: this.winner ? ++playerTwo.losses : playerTwo.losses,
                                    points: playerTwo.points + this.players[1].score
                                })
                            })

                            const gamePatch = await fetch(gameURL + "/" + game.id,{
                                method:"PATCH",
                                headers:{
                                    "content-type":"application/json",
                                    "accept":"application/json"
                                },
                                body:JSON.stringify({
                                    p1_score: this.players[0].score,
                                    p2_score: this.players[1].score,
                                    winner: this.winner ? playerOne.id : playerTwo.id
                                })
                            })
                        } catch(err){console.error(err)}
                    }
                    patchData()
                    this._canvas.style.display = "none"
                    endContainer.style.display = 'block' // take in arg of end game container
                }
            }
        }
        callback()
    }
    //end of constructor
    resetBall()
    {
        this.ball.pos.x = this._canvas.width / 2
        this.ball.pos.y = this._canvas.height / 2
        if (this.ball.vel.x < 0) {
            this.ball.vel.x = 200
            this.ball.vel.y = 200
        } else {
            this.ball.vel.x = -200
            this.ball.vel.y = -200
        }
    }
    // Controls all collisions between ball and player paddles
    collide(player, ball)
    {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top)
        {
            soundObj.hit.play()
            if (ball.vel.x > 0) {
                ball.vel.x += this.incrementalSpeed
                ball.vel.y += this.incrementalSpeed
            } else {
                ball.vel.x -= this.incrementalSpeed
                ball.vel.y -= this.incrementalSpeed
            }
            ball.vel.x = -ball.vel.x
        }
    }
    // Draw function redraws on canvas for every frame in recursive callback function
    draw()
    {   
        // Creates background
        this._ctx.fillStyle = this.backgroundColor
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
        
        // Draws Player 1 (Left Paddle Score)
        this._ctx.fillStyle = this.paddleColor
        this._ctx.font = '50px courier new'
        this._ctx.fillText(
            this.players[0].score,
            (this._canvas.width / 4),
            75
        )
        // Draws Player 2 (Right Paddle Score)
        this._ctx.fillText(
            this.players[1].score,
            (this._canvas.width * 3 / 4),
            75
        )
        
        // Creates Ball
        this.drawRect(this.ball, this.ballColor)
        // Creates both paddles
        this.players.forEach(player => this.drawRect(player, this.paddleColor))        
        
        /*
        // Creates Ball w/ Image
        let imgBall = document.getElementById("img-ball")
        this.drawImg(this.ball, imgBall, 2, 2)
        // Creates paddles one at a time w/ image
        let imgPlayerOne = document.getElementById("img-player-one")
        this.drawImg(this.players[0], imgPlayerOne, 5, 1)        
        let imgPlayerTwo = document.getElementById("img-player-two")
        this.drawImg(this.players[1], imgPlayerTwo, 5, 1)        
        */
        
        // Draws the net in the middle
        this._ctx.beginPath()
        this._ctx.setLineDash([7,15])
        this._ctx.moveTo(this._canvas.width/2, 0)
        this._ctx.lineTo(this._canvas.width/2, this._canvas.height)
        this._ctx.lineWidth = 5
        this._ctx.strokeStyle = this.netColor
        this._ctx.stroke()
        
        if (!startGame) {
            this._ctx.font = '100px georgia'
            this._canvas.fillStyle = '#FFFFFF'
            this._ctx.textAlign = 'center'
            this._ctx.fillText(
                'PAUSE',
                (this._canvas.width / 2),
                (this._canvas.height / 2)
            )
            this._ctx.font = '35px courier new'
            this._ctx.fillText('Controls', (this._canvas.width / 2), (this._canvas.height / 2 + 150))
            this._ctx.font = '20px courier new'
            this._ctx.fillText("Player 1: W / S", (this._canvas.width / 3), (this._canvas.height / 2 + 180))
            this._ctx.fillText("Player 2: P / ;", (this._canvas.width*2 / 3), (this._canvas.height / 2 + 180))
            this._ctx.fillText("Press Space to Pause", (this._canvas.width / 2), (this._canvas.height / 2 + 210))
        }
    }
    // Draws all rectangles on canvas with color
    drawRect(rect, color)
    {
        this._ctx.fillStyle = color
        this._ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y)
    }
    // Draws Images on canvas
    drawImg(rect, img, scaleX, scaleY) // No user function yet
    {
        this._ctx.drawImage(img, rect.pos.x - (rect.size.x/2), rect.pos.y - (rect.size.y/2), rect.size.x*scaleX, rect.size.y*scaleY)
    }
    // Moves each respectively paddle if 'keydown' event remains true
    paddleMove(paddleSpeed)
    {
        if (paddleUpA) {
            if (this.players[0].top > 0 ) {
                this.players[0].pos.y -= paddleSpeed
            }
        }
        if (paddleDownA) {
            if (this.players[0].bottom < canvas.height) {
                this.players[0].pos.y += paddleSpeed
            }
        }
        if (paddleUpB) {
            if (this.players[1].top > 0 ) {
                this.players[1].pos.y -= paddleSpeed
            }
        }
        if (paddleDownB) {
            if (this.players[1].bottom < canvas.height) {
                this.players[1].pos.y += paddleSpeed
            }
        }
    }
    // Update function changed ball position over time
    update(dt) 
    {
        // Sets ball is motion relative to the velocity
        // startGame will start and stop the game
        if (startGame) {
            this.ball.pos.x += this.ball.vel.x * dt
            this.ball.pos.y += this.ball.vel.y * dt
            this.paddleMove(5)
        }
    
        // Adds score to player 1
        if (this.ball.right > this._canvas.width) {
            soundObj.score.play()
            this.players[0].score++
            this.resetBall()
        }
        // Adds score to player 2 
        if (this.ball.left < 0) {
            soundObj.score.play()
            this.players[1].score++
            this.resetBall()
        }
        // Controls bounce off of top and bottom
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            soundObj.wallBounce.play()
            this.ball.vel.y = -this.ball.vel.y
        }
        // Calls collision method on paddles and ball
        this.players.forEach(player => this.collide(player, this.ball))
        // background, net, ball, paddles color
        // black, white, white, white for default
        this.draw()
    }
}

// Sets starting values of keyEvents
let paddleUpA = false
let paddleDownA = false
let paddleUpB = false
let paddleDownB = false
let startGame = false
let gameOver = false

// KEY CODES
// w = 87
// s = 83
// p = 80
// ; = 186
// spacebar = 32

// Event Handlers
const handleKeyDown = (event) => {
    switch (event.keyCode) {
        case (87):
            paddleUpA = true
            break;
        case (83):
            paddleDownA = true
            break;
        case (80):
            paddleUpB = true
            break;
        case (186):
            paddleDownB = true
            break;
        case (32):
            startGame = !startGame
            console.log(startGame)
            break;
    }
}

const handleKeyUp = (event) => {
    switch (event.keyCode) {
        case (87):
            paddleUpA = false
            break;
        case (83):
            paddleDownA = false
            break;
        case (80):
            paddleUpB = false
            break;
        case (186):
            paddleDownB = false
            break;
    }
}

document.onkeydown = handleKeyDown
document.onkeyup = handleKeyUp