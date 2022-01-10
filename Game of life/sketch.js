// Matrix to save the state of the game and the next move
let current, next;

// Number of cells on each row
let numberCell;

// Size of each cell based on screen rate
let cellSize;

// Arrays with the neighbor directions
let movesX = [0,1,1,1,0,-1,-1,-1];
let movesY = [-1,-1,0,1,1,1,0,-1];

// Variable to keep the state of the game
let pause; 

// Color params
let colorProgress; 
let color1;
let color2;

function setup() {
  pause = false;
  // We use the same size to keep the rate in height and width 
  canvasSize = 600;
  numberCell = 40;
  
  colorProgress = 0.00;
  color1 = color(117, 213, 29);
  color2 = color(213, 131, 29);

  cellSize = canvasSize / numberCell;
  createCanvas(canvasSize, canvasSize); 

  // Initialize the game matrix
  current = new Array(numberCell);
  next    = new Array(numberCell);

  for(let i = 0; i < numberCell; i++){
    current[i] = new Array(numberCell); 
    next[i]    = new Array(numberCell);
  }

  frameRate(30);
  clearBoard();
}

function clearBoard() {
  for(let i = 0; i < numberCell; i++){
    for(let j = 0; j < numberCell; j++){
      current[i][j] = floor(random(2));
    }
  }
}

function keyPressed() {
  if (key === ' ') 
    clearBoard();
    
  if (key === 'z'){
    pause = !pause;
  }
}

function mouseDragged(event) {
  let posX = floor(mouseX / cellSize);
  let posY = floor(mouseY / cellSize);

  if (posX <= 0 || posY <= 0 || posX >= numberCell - 1 || posY >= numberCell - 1)
    return;

  // Brush
  current[posX][posY] = 1;
  current[posX+1][posY] = 1;
  current[posX][posY+1] = 1;
  current[posX-1][posY] = 1;
  current[posX][posY-1] = 1;
}

function mouseClicked() {
  let posX = floor(mouseX / cellSize);
  let posY = floor(mouseY / cellSize);

  if (posX <= 0 || posY <= 0 || posX >= numberCell - 1 || posY >= numberCell - 1)
    return;

  
  // Brush
  current[posX][posY] = 1;
  current[posX+1][posY] = 1;
  current[posX][posY+1] = 1;
  current[posX-1][posY] = 1;
  current[posX][posY-1] = 1;
}



function draw() {
  background(0); // Black background

  if(!pause)
    calculateNextStep();

  drawStep();
  colorProgress = (colorProgress + 0.2) % 100;
}

function drawStep() {
  for(let i = 0; i < numberCell; i++){
    for(let j = 0; j < numberCell; j++){
      if(current[i][j] == 0)
        fill(255);
      else {
        fill(lerpColor(color1, color2, (Math.cos(colorProgress)+1)/2)); // For crazy color changes
      }

      stroke(0);
      rect(i*cellSize, j*cellSize, cellSize, cellSize, 5, 5);
    }
  }
}

function calculateNextStep() {
  // Clear the number of neighbours 
  for(let i = 0; i < numberCell; i++){
    for(let j = 0; j < numberCell; j++){
      next[i][j] = 0;
    }
  }
  // We start from 1 to avoid exit from the matrix
  for(let i = 1; i < numberCell-1; i++){
    for(let j = 1; j < numberCell-1; j++){
      let neighbors = 0;
      for(let k = 0; k < movesX.length; k++)
        neighbors += current[i + movesX[k]][j + movesY[k]];
      
      // Rules
      if(current[i][j] == 1) { // Alive
        if(neighbors < 2) // Underpopulation
         next[i][j] = 0; 
        else if(neighbors == 2 || neighbors == 3)  // Lives
          next[i][j] = 1;
        else if(neighbors > 3) // Overpopulation
          next[i][j] = 0;
      }
      else  { // Dead 
        if(neighbors == 3) // Live if there are exactly 3 neighbours alive
          next[i][j] = 1;
      }
    }
  }

  // Swap the matrix
  let temp = current;
  current = next;
  next = temp;
}
