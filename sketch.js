let nn;

const trainingSamples = [{ input: [0, 0], output: [0] },
{ input: [1, 0], output: [1] },
{ input: [0, 1], output: [1] },
{ input: [1, 1], output: [0] }];  

let size;

let lSlider;

function setup() {

  setupNet();
 
  size = 600 / 20;

  createCanvas(600, 600);

  noStroke();

  lSlider = createSlider(1, 5000, 1000);

  let button = createButton('reload');
  button.mousePressed(setupNet);
}

function setupNet() {
  nn = new neuralNetwork([{ size: 2 }, { size: 16 }, { size: 1 }]);  
}


function draw() {

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
    nn.backprop(lSlider.value() / 1000);
  }

  //console.log("err: " + Math.sqrt(totalErr / trainingSamples.length));
}