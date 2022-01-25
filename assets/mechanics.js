// class Game{
//     constructor(){;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let gravity = 0; //here i can toy around with the gravity

const ball = {
  x: 100, // placement on the canvas
  y: 30,
  vx: 0, // this is speed in the x axis of the pull (maby future game mechanic)
  vy: 2,
  width: 40,
  height: 60,
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

// console.log(ball.y);

let floors = [];

// 1 --> multiple objects (duplicated functionality)
// 2 --> OOP with objects and prototype OOP -- old style
// 3 --> conver to ES6 Class

class Obstacle {
  constructor(x, y, width, height, padding, color) {
    this.floorX = x;
    this.floorY = y;
    this.floorWidth = width;
    this.floorHeight = height;
    this.padding = padding;
    this.floorcolor = color;

    // this.floorX = 50;
    // this.floorY = 150;
    // this.floorWidth = 300;      // turn into canvas width for total length
    // this.floorHeight = 5;
    // this.floorPadding = 10;
    // this.floorcolor = "#0095DD";
  }
  drawFloor() {
    ctx.beginPath();
    ctx.rect(this.floorX, this.floorY, this.floorWidth, this.floorHeight);
    // ctx.rect(50, 50, 30, 20);
    ctx.fillStyle = this.floorcolor;
    ctx.fill();
    ctx.closePath();
  }
  floorcollision() {
    let x = this.floorX;
    let y = this.floorY;
    let w = this.floorWidth;

    if (
      !(
        ball.x > x + w ||
        ball.x + ball.width < x ||
        ball.y > y + this.floorHeight ||
        ball.y + ball.height < this.floorHeight
      )
    ) {
      ball.color = "#ff0000";
      // console.log("collison")
      let endfloor = this.floorY - ball.height;
      if (ball.y > endfloor) {
        ball.y = endfloor;
      }
    } else {
      // console.log(" no collison")
      ball.color = "#2e7d32";
    }
  }
  movefloorUp() {
    let speed = 7
    this.floorY -= speed;
    
  }

  
}
createObjects()
    

// ball.draw();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.vy += gravity - ball.userPull;
  ball.x += ball.vx; // the width and height
  ball.y += ball.vy;

  if (rightPressed) {
    ball.x += 7;
    if (ball.x + ball.width > canvas.width) {
      ball.x = canvas.width - ball.width;
    }
  } else if (leftPressed) {
    ball.x -= 7;
    if (ball.x < 0) {
      ball.x = 0;
    }
  }
  if(floors.length < 4){
      console.log(floors)
        createObjects()
}
  preventGoingThroughBottom(); // conditions wen ball hit bottem of canvis
  /// only needed for ground
  floors.forEach((element) => {
    element.floorcollision(); // these condition make sure thea are repeated in this function
    //   console.log(obstacle);
    element.movefloorUp();
    element.drawFloor();
    
});
removeFloorsHitTop()


}
//                           X   Y  Width Heigth P colour
let obstacle = new Obstacle(200, 500, 500, 50, 5, "#0095DD");

// here you can created the length height and possition of the floor and how many re created

function createObjects() {
        for (let i = 0; i < 7; i++) {
  let widthBeginPosition = 50;
  let widthEndPosition = canvas.width - 50;
  let widthValue = Math.floor(
    Math.random() * (widthEndPosition - widthBeginPosition) + widthBeginPosition
  );
  let maxGap = 200;
  let miniGap = 50;
  let gapValue = Math.floor(Math.random() * (maxGap - miniGap) + miniGap);

  //width value = left
  // x value = right
  // what am i trying to do i try to created Random hole between 2 difffrent platforms    And becaus of that i need to change a
  floors.push(new Obstacle(0, 300 + 150 * i, widthValue, 10, 5, "#0095DD"));
  floors.push(new Obstacle( widthValue + gapValue,300 + 150 * i,
      canvas.width,
      10,
      5,
      "#0095DD"
    )
  );
  }
}

console.log(floors)
// console.log(floors[length].floorY)
function removeFloorsHitTop(){
    for( let i = 0; i < floors.length; i++ ){
         if(floors[i].floorY < 200) {
            floors.shift() 
            
        }
        if(floors.length < 4){
        
    }
    }
}


let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function hitFloor() {
  let endfloor = obstacle.floorY - ball.height;
  if (ball.y > endfloor) {
    ball.y = endfloor;
  }
}

function preventGoingThroughBottom() {
  let rockbottom = canvas.height - ball.height;
  if (ball.y > rockbottom) {
    ball.y = rockbottom;
  }
}

setInterval(update, 34); // speed of updates and animation will be used for falling.
