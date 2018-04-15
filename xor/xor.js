let nn;

const trainingSamples = [{ input: [0, 0], output: [0] },
{ input: [1, 0], output: [1] },
{ input: [0, 1], output: [1] },
{ input: [1, 1], output: [0] }];  

let size;
let resolution = 30;

let setLearn = 0.1;
let learnRate = 0.100;

let currentHidden = 32;

function setup() {

  setupNet();

  windowSize = 600;
 
  size = windowSize / resolution;

  let canvas = createCanvas(windowSize, windowSize);
  canvas.parent('canvasDiv');

  noStroke();  
}

function setupNet() {
  nn = new neuralNetwork([{ size: 2 }, { size: currentHidden }, { size: 1 }]);  
}

function learnRateListener() {
  if(setLearn != learnRate) {
    learnRate = setLearn;
    document.getElementById("learnRateTag").innerHTML = "Learn rate: " + learnRate;
  }
}

function hiddenListener() {
  if(currentHidden != nn.layers[1].nodes.length) {
    setupNet();
    document.getElementById("hiddenNodesTag").innerHTML = "Hidden nodes: " + currentHidden;
  }
}

function changeRes(res) {
  resolution = res;

  size = 600/ res;

  document.getElementById("resTag").innerHTML = "Resolution: " + resolution;
}

function draw() {
  learnRateListener();
  hiddenListener();

  for (let i = 0; i < 100; i++)
    train();

  for (let x = 0; x < width; x += size)
  for (let y = 0; y < height; y += size) {
    nn.clear();
    fill(nn.query([x / width, y / height])[0] * 255);
    rect(x, y, size, size);
  }
}

function train() {
  let totalErr = 0;

  for (let i = 0; i < trainingSamples.length; i++) {
    nn.clear();
    nn.query(trainingSamples[i].input.slice());

    totalErr += nn.setError(trainingSamples[i].output);
    nn.backprop(learnRate);
  }

  //console.log("err: " + Math.sqrt(totalErr / trainingSamples.length));
}