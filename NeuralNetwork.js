class neuralNetwork {
  constructor(layerInfo, activationTypes) {
    this.layers = new Array(layerInfo.length);

    for (let i = 0; i < this.layers.length; i++) {


      this.layers[i] = new layer(layerInfo[i], (layerInfo[i - 1] ? layerInfo[i - 1] : null), activationTypes[i]);
    }
  }

  clear() {
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].clear();
    }
  }

  forward() {
    for (let i = 1; i < this.layers.length; i++)
      this.layers[i].calc(this.layers[i - 1]);
  }

  backprop(step, expected) {
    if(expected)
      setError(expected);

    let lastLayer = this.layers.length - 1;

    for (let i = lastLayer; i > 0; i--)
      this.layers[i].back(this.layers[i - 1], step);
  }

  setError(expected) {
    let lastLayer = this.layers.length - 1;

    let totalErr = 0;

    for (let i = 0; i < expected.length; i++) {
      const val = this.layers[lastLayer].nodes[i] - expected[i];
      this.layers[lastLayer].error[i] = val;
      totalErr += val * val;
    }

    return totalErr / expected.length;
  }

  query(input) {
    this.clear();

    this.layers[0].nodes = input;

    this.forward();

    return this.layers[this.layers.length - 1].nodes.slice();
  }
}

class layer {
  constructor(layerInfo, prevLayer, act) {
    this.activationType = act;

    this.nodes = new Array(layerInfo.size);
    this.bias = new Array(layerInfo.size);

    this.error = new Array(layerInfo.size);

    for (let i = 0; i < this.bias.length; i++)
      this.bias[i] = (Math.random() * 2 - 1) * 1.25;

    if (prevLayer) {
      this.vel = new Array(layerInfo.size* prevLayer.size);
      this.weights = new Array(layerInfo.size * prevLayer.size);

      for (let i = 0; i < this.weights.length; i++) {
      this.vel[i] = 0;
        this.weights[i] = (Math.random() * 2 - 1) * 1.25;
    }
  }

    this.clear();
  }

  clear() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i] = 0;
      this.error[i] = 0;
    }
  }

  calc(prevLayer) {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < prevLayer.nodes.length; j++) {
        let weightIndex = (i * prevLayer.nodes.length) + j;
        this.nodes[i] += prevLayer.nodes[j] * this.weights[weightIndex];
      }

      this.nodes[i] = this.activate(this.nodes[i] + this.bias[i]);
    }
  }

  back(prevLayer, step) {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < prevLayer.nodes.length; j++) {
        let weightIndex = (i * prevLayer.nodes.length) + j;

        let gradient = this.der(prevLayer.nodes[j]) * 2 * this.error[i];

        if(this.bias[i] > -2 && this.bias[i] < 2)
        this.bias[i] += -step * gradient;

        this.vel[weightIndex] = -step * prevLayer.nodes[j] * gradient;
        this.weights[weightIndex] += this.vel[weightIndex];

        prevLayer.error[j] += this.weights[weightIndex] * gradient;
      }
    }
  }

  activate(val) {
    switch (this.activationType) {
      case "sigmoid":
          return this.sigmoid(val);
        break;
      case "relu":
        return this.relu(val);
        break;
      default:
        return this.sigmoid(val);
        break;
    }
  }

  der(val) {
    switch (this.activationType) {
      case "sigmoid":
          return this.sigmoidDer(val);
        break;
      case "relu":
        return this.reluDer(val);
        break;
      default:
        this.sigmoidDer(val);
        break;
    }
  }

  softmax() {
    let total = 0;
    for(let i = 0; i < this.nodes.length; i++) {
      total += this.nodes[i];
    }

    total /= this.nodes.length;

    for(let i = 0; i < this.nodes.length; i++) {
      this.nodes[i] *= total;
    }    
  }

  relu(f) {
    if(f < 0)
      return 0;
    return f;
  }

  reluDer(f) {
    if(f == 0)
      return 0;

    return 1;
  }

  sigmoid(f) {
    return 1 / (1 + Math.exp(-f));
  }

  sigmoidDer(f) {
    return f * (1 - f);
  }
}
