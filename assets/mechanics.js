// class Game{
//     constructor(){;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let gravity = 0; //here i can toy around with the gravity
let floorObstacleArr = []

const ball = {
  x: 100,// placement on the canvas
  y: 30,
  vx: 0, // this is speed in the x axis of the pull (maby future game mechanic)
  vy: 2,
  radius: 10,
  color: "#2e7d32",
  userPull: 0,
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0,
         Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

const floorObstacle = {
    floorWidth: 100,
    floorHeight: 20,
    floorPadding: 10,
    
    drawFloor: function () {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, this.floorHeight );
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    },
}


ball.draw();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.vy += gravity - ball.userPull;
  ball.x += ball.vx;
  ball.y += ball.vy;
  floorObstacle.drawFloor();
  
    if(rightPressed) {
        ball.x += 7;
        if (ball.x + ball.radius > canvas.width){
            ball.x = canvas.width - ball.radius;
        }
    }
    else if(leftPressed) {
        ball.x -= 7;
        if (ball.x < 0){
            ball.x = 0;
        }
    }

    

  hitBottom();  // conditions wen ball hit bottem of canvis
  //wil be need for every slider.


}



// trying to get controles right.
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }  
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
};

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    } 
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function hitBottom() {
    let rockbottom = canvas.height - ball.radius;
    if (ball.y > rockbottom) {
        ball.y = rockbottom;
        clearInterval();
    }
}


 setInterval(update, 40);  // speed of updates and animation will be used for falling.



