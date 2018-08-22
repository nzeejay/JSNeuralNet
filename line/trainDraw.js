const stepping = 5;
const scale = 5;

const screenScale = 4;

let canPress = true;

let points = [];

function trainDraw() {
    background(175);

    let prevPoint = nn.query([0]);
    fill(0);
    stroke(0);

    ellipse(0, prevPoint[0] * height, scale, scale);

    for(let x = stepping; x <= width; x += stepping) {
        const point = nn.query([x/width]);
        ellipse(x, point[0] * height, scale, scale);
        
        push();
        stroke(0);
        strokeWeight(scale);
        line(x, point[0] * height, x-stepping, prevPoint[0] * width);
        pop();
        prevPoint = point;
    }
    push();
    fill(255);
    for(let i = 0; i < points.length; i++)          
            ellipse(points[i].x, points[i].y, scale, scale);
    pop();

    if(mouseIsPressed) {
        if(canPress) { 
            const x = mouseX/width;
            const y = mouseY/height;

            if((x >= 0 && x <= 1) && (y >= 0 && y <= 1)) {
            trainingSamples.push(
                {input: [x], output: [y] }
            );

            points.push({x: mouseX, y: mouseY});

            canPress = false;
            }
        }
    }
    else {
        canPress = true;
        }
}
