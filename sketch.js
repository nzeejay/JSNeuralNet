let nn;

const trainingSamples = [{ input: [0, 0], output: [0] },
{ input: [1, 0], output: [1] },
{ input: [0, 1], output: [1] },
{ input: [1, 1], output: [0] }];  

let size;

let lSlider;
let learnRate = 0.100;

let hSlider;
let currentHidden = 3;

function setup() {

  setupNet();
 
  size = 600 / 20;

  createCanvas(600, 600);

  noStroke();

  createP("learn rate: 0.1000");
  lSlider = createSlider(1, 5000, 1000);
  lSlider.position(125, 620);

  createP("hidden layers: " + currentHidden);
  hSlider = createSlider(3, 64, 3, 1);
  hSlider.position(125, 655);
  

  let button = createButton('reload');
  button.mousePressed(setupNet);
}

function setupNet() {
  nn = new neuralNetwork([{ size: 2 }, { size: currentHidden }, { size: 1 }]);  
}

function learnRateListener() {
  if(lSlider.value() / 10000 != learnRate) {
    learnRate = lSlider.value() / 10000;
    document.getElementsByTagName('p')[0].innerHTML = "learn rate: " + learnRate;
  }
}

function hiddenListener() {
  currentHidden = hSlider.value();
  if(currentHidden != nn.layers[1].nodes.length) {
    setupNet();
    document.getElementsByTagName('p')[1].innerHTML = "hidden layers: " + currentHidden;
  }
}

function draw() {
  learnRateListener();
  hiddenListener();

  for (let i = 0; i < 100; i++) {
  train();
  }

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      nn.clear();
      fill(nn.query([x / width, y / height])[0] * 255);
      rect(x, y, size, size);
    }
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
