function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Snake {
  constructor(brain) {
    this.len = 1;
    this.body = [];
    this.body[0] = createVector(0, 0);
    this.xdir = 0;
    this.ydir = 0;
    this.age = 0;
    this.score = 0;
    this.fitness = 0;
    this.genBest = false;
    this.best = false;
    this.distance = 0;

    if (brain) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 4, 4);
    }
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  grow() {
    this.len++;
    this.score++;
    if (this.score >= maxScore) {
      maxScore = this.score;
      this.best = true;
    }
    if (this.score >= genMax) {
      genMax = this.score;
      this.genBest = true;
    }
    switch (this.xdir) {
      case 1:
        this.body.push(createVector(this.body[0].x - 1, this.body[0].y));
        break;
      case -1:
        this.body.push(createVector(this.body[0].x + 1, this.body[0].y));
        break;
      case 0:
        if (this.ydir == 1) {
          this.body.push(createVector(this.body[0].x, this.body[0].y - 1));
        } else {
          this.body.push(createVector(this.body[0].x, this.body[0].y + 1));
        }
        break;
      default:
        break;
    }
  }

  think(food) {
    let inputs = [];

    inputs[0] = this.body[0].x;
    inputs[1] = this.body[0].y;
    inputs[2] = food.x;
    inputs[3] = food.y;
    inputs[4] = this.distance;

    let output = this.brain.predict(inputs);
    // let x = this.body[0].x - food.x;
    // let y = this.body[0].y - food.y;
    //console.log(x + " " + Math.pow(x, 2));
    //console.log(output);

    if (
      output[0] > output[1] &&
      output[0] > output[2] &&
      output[0] > output[3]
    ) {
      this.goRight();
    } else if (
      output[1] > output[0] &&
      output[1] > output[2] &&
      output[1] > output[3]
    ) {
      this.goDown();
    } else if (
      output[2] > output[1] &&
      output[0] < output[2] &&
      output[2] < output[3]
    ) {
      this.goLeft();
    } else if (
      output[3] > output[1] &&
      output[3] > output[2] &&
      output[0] < output[3]
    ) {
      this.goUp();
    }
  }
  update() {
    this.distance = Math.sqrt(
      Math.pow(this.body[0].x - food.x, 2) +
        Math.pow(this.body[0].y - food.y, 2)
    );
    this.think(food, canvasWidth, canvasHeight);
    for (let i = this.len - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    this.body[0].x += this.xdir;
    this.body[0].y += this.ydir;
    this.age++;
    this.triggerGameOver();
    //console.log(this.distance);
  }
  eatFood(position) {
    if (this.body[0].x == position.x && this.body[0].y == position.y) {
      this.grow();
      return true;
    }
    return false;
  }
  show() {
    if (this.best) {
      fill(255, 204, 0);
    } else if (this.genBest) {
      fill(0, 255, 0);
    } else if (this.len > 1) {
      fill(232, 123, 21);
    } else {
      fill(0);
    }
    noStroke();
    this.body.forEach((element) => {
      rect(element.x, element.y, 1, 1);
    });
    // rect(this.body[0].x, this.body[0].y, 1, 1)
  }

  gameOver() {
    // this.body.length = 0;
    // this.len = 1;
    // this.body[0] = createVector(0, 0);
    // this.xdir = 0;
    // this.ydir = 0;
    // this.score = 0;
  }

  triggerGameOver() {
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= 40 ||
      this.body[0].y < 0 ||
      this.body[0].y >= 30
    ) {
      this.gameOver();
      //break;
    }

    for (let i = 1; i < this.len; i++) {
      if (this.body[0].x == this.body[i].x) {
        if (this.body[0].y == this.body[i].y) {
          this.gameOver();
        }
      }
    }
  }

  goLeft() {
    snake.setDir(-1, 0);
  }
  goRight() {
    snake.setDir(1, 0);
  }

  goUp() {
    snake.setDir(0, -1);
  }
  goDown() {
    snake.setDir(0, 1);
  }
}
