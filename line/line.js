let nn;

let isRelu = true;

let trainingSamples = [];

function setup() {
  windowSize = 600;

  let canvas = createCanvas(windowSize, windowSize);
  canvas.parent('canvasDiv');

  setupNet();
  
  noStroke();
  textAlign(CENTER);
  ellipseMode(CENTER);
}

function setupNet() {
  if(isRelu)
    nn = new neuralNetwork([{ size: 1 },  {size: 12, act: "relu" }, {size: 12, act: "relu" }, { size: 1, act: "relu" }]);
  else
    nn = new neuralNetwork([{ size: 1 },  {size: 24 }, {size: 24 }, {size: 24 }, { size: 1 }]);

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