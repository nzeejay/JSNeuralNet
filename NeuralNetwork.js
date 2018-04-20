class neuralNetwork {
  constructor(layerInfo) {
    this.layers = new Array(layerInfo.length);

    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i] = new layer(layerInfo[i], (layerInfo[i - 1] ? layerInfo[i - 1] : null));
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
      let val = this.layers[lastLayer].nodes[i] - expected[i];
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
  constructor(layerInfo, prevLayer) {
    this.nodes = new Array(layerInfo.size);
    this.bias = new Array(layerInfo.size);

    this.error = new Array(layerInfo.size);

    for (let i = 0; i < this.bias.length; i++)
      this.bias[i] = Math.random() * 2 - 1;

    if (prevLayer) {
      this.weights = new Array(layerInfo.size * prevLayer.size);

      for (let i = 0; i < this.weights.length; i++)
        this.weights[i] = Math.random() * 2 - 1;
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

      this.nodes[i] = this.sigmoid(this.nodes[i] + this.bias[i]);
    }
  }

  back(prevLayer, step) {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < prevLayer.nodes.length; j++) {
        let weightIndex = (i * prevLayer.nodes.length) + j;

        let gradient = this.sigmoidDer(prevLayer.nodes[j]) * this.error[i];

        this.bias[i] += -step * gradient;

        this.weights[weightIndex] += -step * prevLayer.nodes[j] * gradient;

        prevLayer.error[j] += this.weights[weightIndex] * gradient;
      }
    }
  }

  sigmoid(f) {
    return 1 / (1 + Math.exp(-f));
  }

  sigmoidDer(f) {
    return f * (1 - f);
  }
}
