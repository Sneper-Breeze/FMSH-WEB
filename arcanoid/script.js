const gameBoard = document.getElementById("gameBoard")
const racket = document.getElementById("racket")
const ball = document.getElementById("ball")

var gameOver = false

var gameLevel = [
   { x: 400, y: 100, width: 50, height: 25},
   { x: 150, y: 200, width: 50, height: 25},
   { x: 500, y: 300, width: 50, height: 25},
]

gameLevel.forEach(createBrick)

// for (var i=0; i < gameLevel.length; i++) {
//    createBrick(gameLevel[i])
// }

var racketObj = {
   Y:  racket.offsetTop,
   X: racket.offsetLeft,
   L: racket.clientWidth,
   dX: 10,
}

var ballObj = {
   X: ball.offsetLeft,
   Y: ball.offsetTop,
   R: 20,
   dX: 2,
   dY: -5,   
}

function onArrowKeyDown(ev) {
   if ((ev.code == "ArrowLeft") && (racketObj.X > racketObj.dX))
   {
      racketObj.X -= racketObj.dX
   }

   if ((ev.code == "ArrowRight") && (racketObj.X + racketObj.L + racketObj.dX < gameBoard.clientWidth)) {
      racketObj.X += racketObj.dX
   }

   racket.style.left = racketObj.X + "px"
}

document.addEventListener("keydown", onArrowKeyDown)

function moveBall() {
   if (ballObj.dX < 0 && ballObj.X <= ballObj.dX) {
      ballObj.dX *= -1
   }

   if (ballObj.dY < 0 && ballObj.Y <= ballObj.dY) {
      ballObj.dY *= -1
   }

   if (ballObj.dX > 0
      && ballObj.X + ball.offsetWidth + ballObj.dX >= gameBoard.clientWidth
   ) {
      ballObj.dX *= -1
   }

   if (ballObj.dY > 0
      && ballObj.Y + ball.offsetHeight + ballObj.dY >= gameBoard.clientHeight   
   ) {
      gameOver = true
   }

   if (ballObj.Y + ball.offsetHeight + ballObj.dY >= racketObj.Y
      && ballObj.X + ballObj.R >= racketObj.X
      && ballObj.X + ballObj.R <= racketObj.X + racket.clientWidth
   ) {
      ballObj.dY *= -1
   }

   // Проверяем на столкновение с кирпичами
   
   var bricks = document.getElementsByClassName("brick")
   for (var i=0; i < bricks.length; i++){
      checkCollapse(bricks[i])
   }
   
   ballObj.X += ballObj.dX
   ballObj.Y += ballObj.dY

   ball.style.left = ballObj.X + "px"
   ball.style.top = ballObj.Y + "px"

   if (!gameOver) {
      window.requestAnimationFrame(moveBall)
   } else {
      alert("Game Over")
   }
}

window.requestAnimationFrame(moveBall)

function createBrick(brick) {
   var el = document.createElement("div")
   el.classList.add("brick")
   el.style.top = brick.y + "px"
   el.style.left = brick.x + "px"
   el.style.width = brick.width + "px"
   el.style.height = brick.height + "px"
   gameBoard.appendChild(el)
}

function checkCollapse(brick){
   if((parseInt(brick.style.left)<=ballObj.X && ballObj.X <= (parseInt(brick.style.left)+parseInt(brick.style.width))
      || parseInt(brick.style.left)<=(ballObj.X+2*ballObj.R) && (ballObj.X+2*ballObj.R) <= (parseInt(brick.style.left)+parseInt(brick.style.width)))
      && (parseInt(brick.style.top)<=ballObj.Y && ballObj.X <= (parseInt(brick.style.top)+parseInt(brick.style.height))
      || parseInt(brick.style.top)<=(ballObj.Y+2*ballObj.R) && (ballObj.Y+2*ballObj.R) <= (parseInt(brick.style.top)+parseInt(brick.style.height)))){
         console.log("Break")
         ballObj.dX *= -1
         ballObj.dY *= -1
         gameBoard.removeChild(brick)
      }
}

// 
// gameBoard.removeChild()
// 