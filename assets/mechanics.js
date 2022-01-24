// class Game{
//     constructor(){;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let gravity = 0; //here i can toy around with the gravity



const ball = {
    x: 100,// placement on the canvas
    y: 30,
    vx: 0, // this is speed in the x axis of the pull (maby future game mechanic)
    vy: 0.7,
    width: 10,
    height: 10,
    color: "#2e7d32",
    userPull: 0,
    
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
    };
    
    console.log(ball.y)
    
    
    let floorObstacleArr = []
    // createFloor = new obstacle(floorObstacle.floorX, floorObstacle.floorY, floorObstacle.floorcolor, floorObstacle.floorWidth, floorObstacle.floorHeight);

const floorObstacle = {
    floorX: 50,
    floorY: 100,
    floorWidth: 150,      // turn into canvas width for total length
    floorHeight: 5,
    floorPadding: 10,
    floorcolor: "#0095DD",
    
    drawFloor: function () {
        ctx.beginPath();
        ctx.rect(this.floorX, this.floorY, this.floorWidth, this.floorHeight);
        ctx.fillStyle = this.floorcolor
        ctx.fill();
        ctx.closePath();
    },
}





ball.draw();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.vy += gravity - ball.userPull;
  ball.x += ball.vx; // the width and height
  ball.y += ball.vy;
  floorObstacle.drawFloor();
  
    if(rightPressed) {
        ball.x += 7;
        if (ball.x + ball.width > canvas.width){
            ball.x = canvas.width - ball.width;
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
    
    floorcollision(); // these condition make sure thea are repeated in this function

    // hitFloor();
}




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
function floorcollision () {
   let x = floorObstacle.floorX;
   let y = floorObstacle.floorY;
   let w =floorObstacle.floorWidth;
   

    if (!(ball.x > x + w ||
        ball.x + ball.width < x ||
        ball.y > y + floorObstacle.floorHeight ||
        ball.y + ball.height < floorObstacle.floorHeight))
        {
        ball.color = "#ff0000";
        console.log("collison")
        let endfloor = floorObstacle.floorY - ball.height;
    if (ball.y > endfloor) {
        ball.y = endfloor;
    } 
    } else {
        console.log(" no collison")
       ball.color = "#2e7d32";
    }
       
    
}

function hitFloor() {
    
    let endfloor = floorObstacle.floorY - ball.height;
    if (ball.y > endfloor) {
        ball.y = endfloor;
    } 

    
}

function hitBottom() {
    let rockbottom = canvas.height - ball.height;
    if (ball.y > rockbottom) {
        ball.y = rockbottom;
        clearInterval();
    }
}


 setInterval(update, 40);  // speed of updates and animation will be used for falling.



