let isTrainWindow = true;

function showTest() {
    isTrainWindow = false;
    document.getElementById("trainControl").style.display = "none";
    document.getElementById("testControl").style.display = "block";
}

function showTrain() {
    isTrainWindow = true;
    document.getElementById("trainControl").style.display = "block";
    document.getElementById("testControl").style.display = "none";
}