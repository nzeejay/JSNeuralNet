let testColourVal;

function testDraw() {
    background(175);
    fill(testColourVal);
    ellipse(300, 300, 400);
    let result = nn.query([testColourVal.levels[0]/255, testColourVal.levels[1]/255, testColourVal.levels[2]/255]);
    document.getElementById("blackLikelyTag").innerHTML = "Black: " + result[0];
    document.getElementById("whiteLikelyTag").innerHTML = "White: " + result[1];
    console.log(result);
    if(result[0] < result[1]) {
        fill(255);
        text(testColourVal, 300, 300);
    } else {
        fill(0);
        text(testColourVal, 300, 300);
    }
}

function testColour(value) {
    testColourVal = color("#" + value);
}
