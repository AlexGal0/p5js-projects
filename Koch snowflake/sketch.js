
let maxIteration = 8;

let color1, color2;
let angle;

function setup() {
  createCanvas(1500, 800);

  textSize(32);
  textAlign(CENTER, CENTER);
  frameRate(20);

  color1 = color(97, 31, 213);
  color2 = color(213, 31, 31);
  angle = 0;
}

function draw() {
  let interA = lerpColor(color1, color2, (cos(radians(angle)) + 1)/2);
  let interB = lerpColor(color2, color1, (cos(radians(angle)) + 1)/2);

  background(interA);

  angle += 7;

  let iteration = floor((mouseX/width)*maxIteration);
  if(iteration < 0) iteration = 0;
  else if(iteration > maxIteration) iteration = maxIteration;


  if(mouseIsPressed)
    fill(interB);
  else
    fill(0); 
  
  beginShape();
  vertex(width, 0);
  vertex(0, 0);
  // vertex(0, height*9/10);

  drawKochLine(0, height*9/10, width, height*9/10, iteration);
  endShape(CLOSE);


  fill(255)
  text('Iteration: ' + iteration, width/2, height/15);
}


function drawKochLine(x1, y1, x2, y2, iteration) {
  vertex(x1, y1);
  if(iteration == 0){
    strokeWeight(0);
    line(x1, y1, x2, y2);
    vertex(x2, y2);
    return;
  }

  let vectorLine = createVector(x2-x1, y2-y1).div(3);
  let newL = vectorLine.mag();
  drawKochLine(x1, y1, x1 + vectorLine.x, y1 + vectorLine.y, iteration - 1);
  vertex(x1 + vectorLine.x, y1 + vectorLine.y);

  let rotate = p5.Vector.rotate(vectorLine, -PI/3);

  let equilateralX = x1 + vectorLine.x + rotate.x;
  let equilateralY = y1 + vectorLine.y + rotate.y;

  drawKochLine(x1 + vectorLine.x, y1 + vectorLine.y, equilateralX, equilateralY, iteration-1);
  vertex(equilateralX, equilateralY);
  drawKochLine(equilateralX, equilateralY, x2 - vectorLine.x, y2 - vectorLine.y, iteration-1);
  vertex(x2 - vectorLine.x,  y2 - vectorLine.y);

  drawKochLine(x2 - vectorLine.x, y2 - vectorLine.y, x2, y2, iteration - 1);



  vertex(x2, y2);
}

