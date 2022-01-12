let iteration = 7;
let word;

const Y_AXIS = 1;
const X_AXIS = 2;

// Stack to save all the square brackets states
let stack, sizeStack;
let dist = 3;
let curX, curY, angle = 25;
let vector;

let font,
  fontsize = 60;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('fonts/Alexandra.otf');
}


function setup() {
  createCanvas(1000, 940);
  word = buildWord('X', iteration);
  frameRate(1000);
  angleMode(DEGREES);

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  stack = new Array(100);
  for(let i = 0; i < stack.length; i++)
    stack[i] = new Array(3);
    sizeStack = 0;

  curX = width/20, curY = height*19/20, angle = -60;
  vector = createVector(cos(angle), sin(angle));
  index = 0;
  background(220);
  b1 = color(183, 239, 226);
  b2 = color(126, 148, 114);
  setGradient(0, 0, width, height, b1, b2, Y_AXIS);


  fill(60);
  text('', width*16/20 , height*18/20);
}


function draw() {
  // background(220);

  // text('Word: ' + word[index], width/2, height/15);
  // text('Angle: ' + angle, width/2, height*2/15);
  // text('Size Stack: ' + sizeStack, width/2, height*3/15);
  // if(sizeStack > 0)
  // text('Current stack: [' + stack[sizeStack-1][0] + ',' + stack[sizeStack-1][1] + ',' + stack[sizeStack-1][2] + ']', width/2, height*4/15);


  buildStep(index);
  index++;
}

function buildStep(index) {
  if(index >= word.length) return;


  if(word[index] == 'F'){ 
    nextX = curX + vector.x*dist;
    nextY = curY + vector.y*dist;
    stroke(114, 124, 74);    
    // console.log(curX + ", " + curY);
    // console.log(nextX + ", " + nextY);
    line(curX, curY, nextX, nextY);

    curX = nextX;
    curY = nextY;
  }
  else if(word[index] == '+'){
    angle -= 25;
    vector = createVector(cos(angle), sin(angle));
  }
  else if(word[index] == '-'){
    angle += 25;
    vector = createVector(cos(angle), sin(angle));
  }
  else if(word[index] == '['){
    if(stack.length < sizeStack)
      stack.push(new Array(3));
    stack[sizeStack][0] = curX + 0;
    stack[sizeStack][1] = curY + 0;
    stack[sizeStack][2] = angle;
    sizeStack++;
  }
  else if(word[index] == ']'){
    curX = stack[sizeStack-1][0];
    curY = stack[sizeStack-1][1];
    angle = stack[sizeStack-1][2];

    sizeStack--;
    vector = createVector(cos(angle), sin(angle));
  }

}

function buildWord(word, iteration) {

  let nextStep = "";

  for(let i = 0; i < iteration; i++) {
    for(let j = 0; j < word.length; j++) {
      if(word[j] == 'X'){
        nextStep += "F+[[X]-X]-F[-FX]+X";
      }
      else if(word[j] == 'F'){
        nextStep += 'FF';
      }
      else
      nextStep += word[j];

    }

    word = nextStep;
    nextStep = "";
  }

  return word; 
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i+= 0.01) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i += 0.01) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
