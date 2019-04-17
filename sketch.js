let birds = [];
let old_gen = [];
var pipes = [];
const NUMBER_OF_BIRDS = 3000;
var bestBird ;
var showBirds = true;
var showPipes = true;
var score;
var highScore;
var generation = 0;
var gameSpeed = 60;
var isTraining = false;
function setup() {
  score = 0;
  highScore = 0;
  createCanvas(600,400);
  for (let i =0; i< NUMBER_OF_BIRDS; i++){
    birds.push(new Bird());
  }
  pipes.push(new Pipe());
  playBestButton = createButton('Play the best bird so far');
  playBestButton.position(5, 405);
  playBestButton.mousePressed(playBestBird);
  showBirdsButton =  createButton("Show Birds");
  showPipesButton = createButton("Show Pipes");
  showBirdsButton.position(5,430);
  showPipesButton.position(5,450);
  showBirdsButton.mousePressed(()=> {showBirds = !showBirds});
  
  showPipesButton.mousePressed(()=> {showPipes = !showPipes});
  speedSlider = createSlider(1, 100, 1);
  speedSlider.position(100,480);
  trainButton = createButton("Train");
  trainButton.position(5,480);
  trainButton.mousePressed(()=> {isTraining = !isTraining; train()});
}

function gameLoop(){
  calculateFitness();
  score+=1;
  if(score % 70 == 0){
    pipes.push(new Pipe());
  }

  for(pipe of pipes){
    pipe.update();
    for(bird of birds){
      if(pipe.hits(bird)) {
        old_gen.push(birds.splice(birds.indexOf(bird),1)[0]);
       
        if(birds.length == 0){
          bestBird = old_gen[old_gen.length-1];
         restart();
         return;
        }
      }
  }
    if(pipe.offscreen()){
      pipes.splice(pipes.indexOf(pipe),1);
    }
    // Text wraps within text box
  }
  for(bird of birds)  {
    bird.score+=1;
    bird.think(pipes);
    bird.update();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function train(){
  while(isTraining){
    for(let i =0 ; i<gameSpeed; i++){
      gameLoop();
    }
    await sleep(1);
  }
}

function draw() {
  background(0);
  if(!isTraining){
    calculateFitness();
    gameSpeed = speedSlider.value();
    score+=1;
    if(frameCount % 70 == 0){
      pipes.push(new Pipe());
    }

    for(pipe of pipes){
      pipe.update();
      if(showPipes){
        pipe.show();
      }
      for(bird of birds){
        if(pipe.hits(bird)) {
          old_gen.push(birds.splice(birds.indexOf(bird),1)[0]);
        
          if(birds.length == 0){
            bestBird = old_gen[old_gen.length-1];
          restart();
          return;
          }
        }
    }
      if(pipe.offscreen()){
        pipes.splice(pipes.indexOf(pipe),1);
      }

      // Text wraps within text box
    }
    for(bird of birds)  {
      bird.score+=1;
      bird.think(pipes);
      bird.update();
      if(showBirds){
        bird.show();
      }
    }
  }
  let s = `Score  : ${score}\nHighScore : ${highScore}\nGeneration : ${generation}`;
  //fill(255);
  text(s, 10, 10, 100, 80);
  let speedText = `Speed  : x${gameSpeed}`;
  text(speedText, 500, 350, 100, 80);
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

function playBestBird() {
  for(bird of birds) {
    old_gen.push(bird);
  }
  birds = [bestBird];
}