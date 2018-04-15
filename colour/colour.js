let nn;

let trainingSamples = [];

function setup() {
  windowSize = 600;

  let canvas = createCanvas(windowSize, windowSize);
  canvas.parent('canvasDiv');

  setupNet();

  testColourVal = color("#AB2567");

  noStroke();
  textAlign(CENTER);
}

function setupNet() {
  nn = new neuralNetwork([{ size: 3 }, { size: 12 }, { size: 12 }, { size: 2 }]);
}

function draw() {
  if(isTrainWindow) {
  trainDraw();
    if(isTraining) {
      for(let i = 0; i < 9; i++)
        train();

      document.getElementById("errorTag").innerHTML = "Error: " + train();
    }
  } else {
    testDraw();
  }
}