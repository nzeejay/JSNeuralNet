let isMousePressed;

let circSize = 275;

let pos1 = { x: 150, y: 450 };
let pos2 = { x: 150 * 3, y: 450 };

let currentColour = getRandomColour();

let mouseWasDown;

function trainDraw() {
    background(175);

    textSize(48);
    fill(0);
    text("Pick the better text colour", 300, 100);

    textSize(24);
    text("Training samples: " + trainingSamples.length + "/10", 300, 125);

    if (trainingSamples.length > 10)
        text("Ready to train! (hopefully)", 300, 150);

    selectorHandeler();

    drawCircles(currentColour);
}

function drawCircles(colour) {
    fill(colour.r, colour.g, colour.b);
    ellipse(pos1.x, pos1.y, circSize, circSize);
    ellipse(pos2.x, pos2.y, circSize, circSize);

    textSize(28);

    fill(0);
    text("black", pos1.x, pos1.y + 12);

    fill(255);
    text("white", pos2.x, pos2.y + 12);
}

function selectorHandeler() {
    if (mouseY > 300 && mouseY < 600 &&
        mouseX > 0 && mouseX < 600) {
        fill(0, 25);

        let hoverX = 0;
        if (mouseX > 300)
            hoverX = 300;

        rect(hoverX, 300, 300, 300);

        if (mouseIsPressed && !mouseWasDown) {
            mouseWasDown = true;

            let outp;

            if (hoverX == 0) {
                outp = [1, 0];
            } else {
                outp = [0, 1];
            }

            trainingSamples.push({
                input: [currentColour.r / 255, currentColour.g / 255, currentColour.b / 255],
                output: outp
            });

            addSample(outp);

            currentColour = getRandomColour();
        }
    }

    if (!mouseIsPressed)
        mouseWasDown = false;
}

function getRandomColour() {
    let ret = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 };
    if ((ret.r + ret.g + ret.b) / 3 < 125 && Math.random() < 0.2)
        return getRandomColour();
    return ret;
}

function specifyColour(value) {
    let c = color("#" + value);
    currentColour = { r: c.levels[0], g: c.levels[1], b: c.levels[2] };
}

function addSample(outp) {
    let domClr = "black";

    if(outp[1] == 1)
        domClr = "white";

    let circClr = "rgb(" + parseInt(currentColour.r) + ", " +
    parseInt(currentColour.g) + ", " +
    parseInt(currentColour.b) + ")";

    document.getElementById("trainingSamples").innerHTML += "<span style='background:" + circClr + "' class='dot " + domClr + "'>" + domClr + "</span>";
}