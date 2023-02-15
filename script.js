
const TOTAL = 3000;
let mutationlim = .5;
const d = new Date();
let time = 0;

let canvasWidth = 800;
let canvasHeight = 600;

let startingRate = 10;
let rez = 20;

let snakes = [];
let savedSnakes = [];

let generationNum = 1;
let maxScore = 0;
let genMax = 0;
let blackDestruction = true;
let destruction = false
let timer = 100;
let showBest = false;

function setup() {
    let time = d.getTime();
    createCanvas(canvasWidth, canvasHeight);
    frameRate(startingRate);
    for (let i = 0; i < TOTAL; i++) {
        snakes[i] = new Snake();
    }

    foodLoc();
}

function foodLoc() {
    let x = floor(random(canvasWidth / rez));
    let y = floor(random(canvasHeight / rez));
    food = createVector(x, y);
    // if (snake.body.includes(food)) {
    //     foodLoc();
    // }
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            goLeft();
            break;
        case RIGHT_ARROW:
            goRight();
            break;
        case UP_ARROW:
            goUp();
            break;
        case DOWN_ARROW:
           goDown();
            break;
        default:
            break;
    }
}

function draw() {
    
    
    frameRate(startingRate);
    scale(rez);
    background(51, 102, 255);


    for (snake of snakes) {
        if (snake.eatFood(food)) {
            foodLoc();
            if (timer < 1200){
                timer++;
            }
        }
        snake.think(food, canvasWidth, canvasHeight);
        snake.update();
        if (showBest) {
            if (snake.best || snake.genBest) {
                snake.show();
            }
        } else {
            snake.show();
        }
        
    
    }


    for (let i = snakes.length-1; i >= 0; i--) {
        if (gO(snakes[i]) || ((snakes[i].age > (10 + timer) && snakes[i].score == 0)) && blackDestruction) {
            savedSnakes.push(snakes.splice(i, 1)[0]);
        }
        else if ((snakes[i].age > (50 + timer) && destruction)) {
            savedSnakes.push(snakes.splice(i, 1)[0]);
            // moveFood();
            // destruction = false;
        }
        
    }
    if (snakes.length == 0) {
        resetGame();   
        timer = 100;
    }
    document.getElementById("score").innerHTML = "Alive: " + snakes.length + " Dead: " + savedSnakes.length + " Total: " + (snakes.length + savedSnakes.length);
    document.getElementById("generation").innerHTML = "Generation Number: " + generationNum + " | Timer: " + (timer/10) + " Seconds";
    document.getElementById("highestscore").innerHTML = "Highest Score: " + maxScore;

    noStroke();
    fill(255, 0, 0)
    rect(food.x, food.y, 1, 1);
}

function goLeft() {
    snake.setDir(-1, 0);
}
function goRight() {
    snake.setDir(1, 0);
}

function goUp() {
    snake.setDir(0, -1);
}
function goDown() {
    snake.setDir(0, 1);
}
function gO(snake){
    //console.log(snake);
    if (snake.body[0].x < 0 || snake.body[0].x >= 40 || snake.body[0].y < 0 || snake.body[0].y >= 30) {
        return true;
    }
    for (let i = 1; i < this.len; i++) {
        if (snake.body[0].x == snake.body[0].x) {
            if (snake.body[0].y == snake.body[0].y) {
                return true;
            }
        }
    }
    return false;
}

function changeSpeed(direction) {
    if (direction == "up") {
        startingRate += 10;
    } else {
        startingRate -= 10;
    }
    
}
function destroySnakes() {
    resetGame();
    
}
function des() {
    
    if (destruction) {
        document.getElementById("des").innerHTML = "Enable Best Auto Destruction"

    } else{
        document.getElementById("des").innerHTML = "Disable Best Auto Destruction"

    }
    destruction = !destruction;

}
function blackDes() {
    
    if (blackDestruction) {
        document.getElementById("blackDes").innerHTML = "Enable Auto Destruction"

    } else{
        document.getElementById("blackDes").innerHTML = "Disable Auto Destruction"

    }
    blackDestruction = !blackDestruction;

}

function moveFood() {
    foodLoc();
}
function onlyBest() {
    showBest =!showBest;
}
function changeTimerUp(){
    timer += 5;
    //document.getElementById("generation").innerHTML = "Generation Number: " + generationNum + " | Timer: " + (timer/10) + " Seconds";

}
function changeTimerDown(){
    timer -= 5;
    //document.getElementById("generation").innerHTML = "Generation Number: " + generationNum + " | Timer: " + (timer/10) + " Seconds";

}
// document.getElementById("speed-up").onclick() = changeSpeed("up");
// document.getElementById("slow-down").onclick() = changeSpeed("down");
// document.getElementById("destruction").onclick() = destroySnakes();