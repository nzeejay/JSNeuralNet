let trainStep = 0.1;

function train() {
    let totalErr = 0;

    for (let i = 0; i < trainingSamples.length; i++) {
        nn.clear();
        nn.query(trainingSamples[i].input.slice());

        totalErr += nn.setError(trainingSamples[i].output);
        nn.backprop(trainStep);
        nn.layers[nn.layers.length - 1].softmax();
    } 

    return Math.sqrt(totalErr / trainingSamples.length);
}

let isTraining = false;

function startTraining() {
    isTraining = true;
}

function stopTraining() {
    isTraining = false;
}

function setLearn(val) {
    trainStep = val;
    document.getElementById("learnRateTag").innerHTML = "Learn rate: " + val;
}