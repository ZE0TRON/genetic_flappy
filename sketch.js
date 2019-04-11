let birds = [];
let old_gen = [];
var pipes = [];
const NUMBER_OF_BIRDS = 500;
var score;
var highScore;
var generation = 0;
function setup() {
  score = 0;
  highScore = 0;
  createCanvas(600,400);
  for (let i =0; i< NUMBER_OF_BIRDS; i++){
    birds.push(new Bird());
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  calculateFitness();
  score+=1;
  if(frameCount % 70 == 0){
    pipes.push(new Pipe());
  }

  for(pipe of pipes){
    pipe.update();
    pipe.show();
    for(bird of birds){
      if(pipe.hits(bird)) {
        old_gen.push(birds.splice(birds.indexOf(bird),1)[0]);
       
        if(birds.length == 0){
         restart();
         return;
        }
      }
  }
    if(pipe.offscreen()){
      pipes.splice(pipes.indexOf(pipe),1);
    }

    let s = `Score  : ${score}\nHighScore : ${highScore}\nGeneration : ${generation}`;
    fill(255);
    text(s, 10, 10, 100, 80); // Text wraps within text box
  }
  for(bird of birds)  {
    bird.score+=1;
    bird.think(pipes);
    bird.update();
    bird.show();
  }
}
function keyPressed() {
  if(key == ' '){
    // console.log("Space pressed;")
    bird.up();
  }
}

function restart() {
  pipes = [];
  birds = [];
  nextGeneration();
  generation+=1;
  if(score> highScore) {
    highScore = score;
  }
  score = 0;
  pipes.push(new Pipe()); 
}