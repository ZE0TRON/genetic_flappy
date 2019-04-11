function nextGeneration() {
    calculateFitness();

    for (let i = 0; i< NUMBER_OF_BIRDS; i ++) {
        birds.push(pickOne());
    }
    old_gen = [];
}

function pickOne() {
    var index = 0;
    var r = random(1);
    while(r > 0) {
        r = r - old_gen[index].fitness;
        index++;
    }
    index--;
    let bird = old_gen[index];
    child = new Bird(bird.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for(bird of old_gen) {
        sum += bird.score;
    }
    for(bird of old_gen) {
        bird.fitness += bird.score/sum;
    }
}