

function resetGame() {
    console.log("Resetting Game")
    calcFitness(savedSnakes);
    console.log("Fitness Claculated")
    snakes = nextGen(savedSnakes);
    console.log("Next generation Created")
    //savedSnakes = snakes.slice();
    let l = snakes.length;
    if (snakes.length  < TOTAL) {
        for (let i = 0; i < TOTAL - l; i++) {
            snake = new Snake();
            snakes.push(snake);
        }
    }
    savedSnakes.length = 0;
    // if (document.getElementById('des').innerHTML == "Enable Best Auto Destruction") {
    //     destruction = true;        
    // }
}



function nextGen(s) {
    let nextGeneration = [];
    for (let i = 0; i < s.length; i++) {
        let snake = pickOne(s);
        nextGeneration[i] = snake;
    }
    generationNum++;
    genMax = 0;
    return nextGeneration;
    
}


function calcFitness(snakes) {

    let scoreSum = 0;
    //let ageSum = 0;
    // let score = 1;


    for (let i = 0; i < snakes.length; i++) {  
        snakes[i].score = (pow(snakes[i].len, 2));
        switch (true) {
            case snakes[i].distance <10:
                snakes[i].score += 1;
                break;
            case snakes[i].distance <5:
                snakes[i].score += 2;
                break;
            case snakes[i].distance <2:
                snakes[i].score += 3;
                break;
        
            default:
                break;
        }

    }

    for (let snake of savedSnakes) {
        scoreSum += snake.score;
    }
    // for (let snake of savedSnakes) {
    //     ageSum += snake.age;
    // }
    // console.log(scoreSum);

    for (let i = 0; i < snakes.length; i++) {  
        snakes[i].fitness = (snakes[i].score / scoreSum);
        // if (isNaN(snakes[i].fitness)) {
        //     snakes[i].fitness = .1;
        // }
    }

    // console.log()
}

function pickOne(s) {
    let index = 0;
    let r = random(1);

    while(r>0){
        r -= s[index].fitness;
        index++;
    }
    index--;

    let snake = s[index];
    let child =  new Snake(snake.brain);
    mutate(child);
    return child;
}
