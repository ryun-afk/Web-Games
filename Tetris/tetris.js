const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

// Define the grid dimensions and scaling factor
const grid = { width: 10, height: 20 };
const scalar = 20;
canvas.width = (grid.width) * scalar;
canvas.height = grid.height * scalar;


function drawSquare(x,y,color) {
    c.fillStyle = color;
    c.fillRect(x*scalar,y*scalar,scalar,scalar);
    c.strokeStyle = "black";
    c.strokeRect(x*scalar,y*scalar,scalar,scalar);
}

// Create the game board and initialize it with empty cells
const empty = "gray";
let board = [];
for (var i = 0; i < grid.width + 3 ; i++){
    board[i] = [];
    for (let j = 0; j < grid.height + 3; j++){
        board[i][j] = empty;
        if(i>9 || j > 19){
            board[i][j] = "black";
        }
    }
}
function drawBoard(){
    for (var i = 0; i < grid.width+3; i++){
        for (let j = 0; j < grid.height+3; j++){
            drawSquare(i,j,board[i][j]);
        }
    }
}

// Define the Tetris pieces and their colors
const PIECES = [
    [[[1,1,0],[0,1,1],[0,0,0]],"red"],
    [[[0,1,1],[1,1,0],[0,0,0]],"green"],
    [[[1,1,1],[0,1,0],[0,0,0]],"purple"],
    [[[1,1],[1,1]],"yellow"],
    [[[1,1,1],[1,0,0],[0,0,0]],"orange"],
    [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],"cyan"],
    [[[1,1,1],[0,0,1],[0,0,0]],"blue"]
];

// Constructor function for a Tetris piece
function Piece(matrix,color){
    this.matrix = matrix;
    this.color = color;
    this.x = 4;
    this.y = 0;
}

// Function to draw the current piece
random = Math.floor(Math.random()*PIECES.length)
let piece = new Piece(PIECES[random][0],PIECES[random][1]);
function drawPiece(){
    for(var i = 0; i < piece.matrix.length; i++){
        for (var j = 0; j < piece.matrix.length; j++){
            if (piece.matrix[j][i]){
                drawSquare(piece.x + i, piece.y + j, piece.color);
            }
        }
    }
}

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const result = [];
    for (let j = 0; j < cols; j++) {
        result[j] = Array(rows);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
  }

  function mirror(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;

    const result = [];
    for (let j = 0; j < cols; j++) {
        result[j] = Array(rows);
    }

    for (let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            result[i][j] = matrix[i][cols-j-1];
        }
    }
    return result
  }

function checkCollision(){
    for(let i = 0; i < piece.matrix.length; i++){
        for(let j = 0; j < piece.matrix[0].length;j++){
            if((piece.matrix[i][j]) && board[piece.x + j][piece.y +i] != empty){
                return true;
            }
        }
    }

    return false;
}

function lockPiece(){
    for(let i = 0; i < piece.matrix.length; i++){
        for(let j = 0; j < piece.matrix[0].length;j++){
            if(piece.matrix[i][j]){
                board[piece.x + j][piece.y + i] = piece.color;
            }
        }
    }
    random = Math.floor(Math.random()*PIECES.length);
    piece = new Piece(PIECES[random][0],PIECES[random][1]); 
}

function moveLeft(){
    if(piece.x > 0){
        piece.x -= 1;
    }
    if(checkCollision()){
        piece.x += 1;
    }
}

function rotatePiece(p){
    temp = p.matrix;
    temp = transpose(temp);
    temp = mirror(temp);
    piece.matrix = temp;
}

function moveRight(){
    if(piece.x < grid.width){
        piece.x += 1;
    }
    if(checkCollision()){
        piece.x -= 1;
    }
}

function moveDown(){
    if(piece.y > grid.height){
        lockPiece();
    }
    if(checkCollision()){
        piece.y -=1;
        lockPiece();
    }
    piece.y += 1;
}

// Function to control the current piece
document.addEventListener("keydown", keyPush);
function keyPush(event) {
    switch (event.keyCode) {
        case 37: moveLeft();
        break;
        case 38: rotatePiece(piece);
        break;
        case 39: moveRight();
        break;
        case 40: moveDown();
        break;
    }
    drawGame();
}

function drawGame(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
}

function updateGame(){
    moveDown();
    drawGame();
}

drawGame();
setInterval(updateGame,1000);