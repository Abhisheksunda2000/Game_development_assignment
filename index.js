const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

// block dimensions
const blockWidth = 100
const blockHeight = 20

// paddle dimensions
const paddleWidth = 200
const paddleHeight = 20

// ball dimensions
const ballDiameter= 20

// board dimensions
const boardWidth = 1000
const boardHeight = 600


// speed variables
let timerId
let game = 0

// direction variables
let xDirection = -2
let yDirection = 2

//scoring variables
let score = 0
let level = 30

// starting position for user paddle
const userStart = [300, 10]
let currentPostion = userStart

// starting position for the ball
const ballStart = [400, 100]
let ballCurrentPostion = ballStart

//creat Block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// array of blocks
const blocks = [
    new Block(10, 570),
    new Block(120, 570),
    new Block(230, 570),
    new Block(340, 570),
    new Block(450, 570),
    new Block(560,570),
    new Block(670,570),
    new Block(780,570),
    new Block(890,570),

    new Block(10, 540),
    new Block(120, 540),
    new Block(230, 540),
    new Block(340, 540),
    new Block(450, 540),
    new Block(560,540),
    new Block(670,540),
    new Block(780,540),
    new Block(890,540),

    new Block(10, 510),
    new Block(120, 510),
    new Block(230, 510),
    new Block(340, 510),
    new Block(450, 510),
    new Block(560,510),
    new Block(670,510),
    new Block(780,510),
    new Block(890,510),

    new Block(10, 480),
    new Block(120, 480),
    new Block(230, 480),
    new Block(340, 480),
    new Block(450, 480),
    new Block(560,480),
    new Block(670,480),
    new Block(780,480),
    new Block(890,480),

    new Block(10, 450),
    new Block(120, 450),
    new Block(230, 450),
    new Block(340, 450),
    new Block(450, 450),
    new Block(560,450),
    new Block(670,450),
    new Block(780,450),
    new Block(890,450),

    new Block(10, 420),
    new Block(120, 420),
    new Block(230, 420),
    new Block(340, 420),
    new Block(450, 420),
    new Block(560,420),
    new Block(670,420),
    new Block(780,420),
    new Block(890,420),
   
    new Block(10, 390),
    new Block(120, 390),
    new Block(230, 390),
    new Block(340, 390),
    new Block(450, 390),
    new Block(560,390),
    new Block(670,390),
    new Block(780,390),
    new Block(890,390),
   
]
// adding blocks into the array

function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }

}

addBlock()


//add the user paddle
const user = document.createElement('user')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw user paddle
function drawUser() {
    user.style.left = currentPostion[0] + 'px'
    user.style.bottom = currentPostion[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballCurrentPostion[0] + 'px'
    ball.style.bottom = ballCurrentPostion[1] + 'px'
}


//move the user paddle
function moveUser(e) {
    switch (e.key) {

        case 'ArrowLeft':
            if (currentPostion[0] > 0) {
                currentPostion[0] -= 15
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPostion[0] < boardWidth - paddleWidth) {
                currentPostion[0] += 15
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// add the ball
const ball = document.createElement('ball')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


//move the ball
function moveBall(){
    ballCurrentPostion[0]+= xDirection
    ballCurrentPostion[1]+= yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall,10)

//check for collisions of the ball

function checkForCollisions(){

        // check for block collisions
        for(let i=0; i<blocks.length; i++){
             if(
                (ballCurrentPostion[0] > blocks[i].bottomLeft[0] && ballCurrentPostion[0] < blocks[i].bottomRight[0]) &&
                ((ballCurrentPostion[1]+ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPostion[1] < blocks[i].topLeft[1])
                )
                {
                    const allBlocks = Array.from(document.querySelectorAll('.block'))
                    allBlocks[i].classList.remove('block')
                    blocks.splice(i,1)
                    changeDirection()
                    score+=1
                    scoreDisplay.innerHTML = score

                    //check for win
                    if(blocks.length === 0){
                            scoreDisplay.innerHTML = 'YOU WIN'
                            clearInterval(timerId)
                            document.removeEventListener('keydown', moveUser)
                    }
                }
        }

        //check for wall collisions
        if(
            ballCurrentPostion[0] >= (boardWidth-ballDiameter) || 
            ballCurrentPostion[1] >= (boardHeight - ballDiameter) || 
            ballCurrentPostion[0] <=0 
            ) {
             changeDirection() 
        }

        // check for user paddle collisions
        if(
           (ballCurrentPostion[0] > currentPostion[0] && ballCurrentPostion[0] < currentPostion[0]+paddleWidth)&&
           (ballCurrentPostion[1] > currentPostion[1] && ballCurrentPostion[1] < currentPostion[1] + paddleHeight)
        )
        {
            changeDirection()
        }
        //check for game over

        if(ballCurrentPostion[1] <=0){
            clearInterval(timerId)
            scoreDisplay.innerHTML = 'YOU LOST'
            document.removeEventListener('keydown', moveUser)
            
        }


}

//function to change the direction of the ball 
function changeDirection(){
      
     if(xDirection === 2 && yDirection === 2){
        yDirection= -2
        return
      }

      if(xDirection ===2 && yDirection===-2){
         xDirection=-2
         return
      }

      if(xDirection ===-2 && yDirection === -2){
        yDirection = 2
        return
      }

      if(xDirection===-2 && yDirection ===2){
         xDirection = 2
         return
      }

}

