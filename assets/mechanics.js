
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


let floorCount = 0;
const charImage = new Image()
charImage.src = "/game pix/Dwarf Miner Sprite Sheet.png"
let speedup = 3



const ball = {
  x: 100, // placement on the canvas
  y: 700,
  vx: 0, // this is speed in the x axis of the pull (maby future game mechanic)
  vy: 7,
  width: 32,
  height: 54,
//   color: charImage,
  userPull: 0,
 
  draw: function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.drawImage(charImage, 20, 00, 64 ,64 /2 ,this.x, this.y - 74,  150, 128 );
  },
};

class Obstacle {
  constructor(x, y, width, height, padding, color) {
    this.floorX = x;
    this.floorY = y;
    this.floorWidth = width;
    this.floorHeight = height;
    this.padding = padding;
    this.floorcolor = color;
    this.deleted = false;

    // this.deleted = false;
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
    ctx.closePath();
    ctx.drawImage(floorImage, this.floorX, this.floorY, this.floorWidth, 60);
    // ctx.fillStyle = this.floorcolor;
    // ctx.fill();
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
    //   ball.color = "#ff0000";
      // console.log("collison")
      let endfloor = this.floorY - ball.height;
      if (ball.y > endfloor) {
        ball.y = endfloor;
      }
    } else {
      // console.log(" no collison")
    //   ball.color = "#2e7d32";
    }
  }
  
  movefloorUp() {
    // if i have 50 floors than increase speed  need 
    // switch((( floorCount ) + 2)% condition === 0){
    //     case 1:
    //         floorCount 10
    //        let condition = 10 
    //     speedup += 0.5
    //     break;
    //      console.log("it works")
    // }
    if(floorCount > 20 && floorCount < 40){
        speedup = 4
    } else if (floorCount > 40 && floorCount < 60){
        speedup = 6
    }else if (floorCount > 60 && floorCount < 80){
        speedup = 8
    }else if (floorCount > 80 && floorCount < 100){
        speedup = 11
    }
    
    console.log("this is speed up " +speedup);
    console.log("this is amount of floors" + floorCount);
    
    this.floorY -= speedup;
    
  }

}



// here you can created the length height and possition of the floor and how many re created


// <--- The Mighty Update for making stuff move --->
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();

    ball.vy += gravity - ball.userPull;
    ball.x += ball.vx; // the width and height
    ball.y += ball.vy;
    
    if (rightPressed) {
      ball.x += 15;
      if (ball.x + ball.width > canvas.width) {
        ball.x = canvas.width - ball.width;
      }
    } else if (leftPressed) {
      ball.x -= 15;
      if (ball.x < 0) {
        ball.x = 0;
      }
    }

    
    preventGoingThroughBottom(); // conditions wen ball hit bottem of canvis
    /// only needed for ground
    floors.forEach((element) => {

      

      if (element.floorY < 80 && element.deleted == false) {
        // We should remove this floor.
        element.deleted = true
        floorCount += 1 
        if ( floorCount % 2 == 0){
            createObjects(3);
        }
      }
      
      if (element.deleted == false){
        element.floorcollision(); // these condition make sure thea are repeated in this function
        //   console.log(obstacle);
        element.movefloorUp();
      element.drawFloor(); }
    // if (element.floorY < 70) {
    //     floors.shift()
    
    // }
});

gameOver()

}




function createObjects(lvl) {
  // for (let i = 0; i < 7; i++) {
  let widthBeginPosition = 50;
  let widthEndPosition = canvas.width - 50;
  let widthValue = Math.floor(
    Math.random() * (widthEndPosition - widthBeginPosition) + widthBeginPosition
  );
  let maxGap = 200;
  let miniGap = 80;
  let gapValue = Math.floor(Math.random() * (maxGap - miniGap) + miniGap);

  //width value = left
  // x value = right
  // what am i trying to do i try to created Random hole between 2 difffrent platforms    And becaus of that i need to change a
  floors.push(new Obstacle(0, 320 + 300 * lvl, widthValue, 20, 5, "#0095DD"));
  floors.push(
    new Obstacle(
      widthValue + gapValue, 320 + 300 * lvl, canvas.width, 20, 5, "#0095DD"
    )
  );
}


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

function createInitalObjects (){
    for( let i = 0; i < 4; i++){
    createObjects(i)
    }
   
}
function gameOver (){
    let dead = (canvas.height - 1190) + ball.height;
    if(ball.y < dead){
        console.log("stop Game")
        alert("stop game")
        // clearInterval(this.update());
        // clearInterval(this.setInterval())
    }
}

// function audioVolume() {
//     let audio = document.getElementById("myaudio");
//     audio.volume = 0.05;
// };

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let gravity = 0; //here i can toy around with the gravity
let floors = [];
const floorImage = new Image()
floorImage.src = "/game pix/longwidthfloor.png";





//                           X   Y  Width Heigth P colour
// let obstacle = new Obstacle(200, 500, 500, 50, 5, "#0095DD");

// <---- function defined ----->
// audioVolume();

createInitalObjects();

setInterval(update, 40); // speed of updates and animation will be used for falling.

