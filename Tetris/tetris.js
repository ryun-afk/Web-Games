const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

// Define the grid dimensions and scaling factor
const grid = { width: 16, height: 26 };
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
const empty = "#f0f0f0";
const border = "green";
let board = [];
clearBoard();
function clearBoard(){
    for (var i = 0; i < grid.width; i++){
        board[i] = [];
        for (let j = 0; j < grid.height; j++){
            board[i][j] = empty;
            if(i<3 || 12 < i || j<3 || 22 < j  ){
                board[i][j] = border;
            }
        }
    }
}

// adjust draw after debug
function drawBoard(){
    for (var i = 0; i < grid.width; i++){
        for (let j = 0; j < grid.height; j++){
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
    // fix rotation to avoid rotating outside of border
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
    if(piece.y > grid.height -1){
        lockPiece();
    }
    piece.y += 1;
    if(checkCollision()){
        piece.y -=1;
        if(piece.y ==0){
            resetGame();
        }
        else{
            lockPiece();
        }
        
    }
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

function copyLine(row){
    board[row] = board[row+1];
}

function clearLine(){
    let temp = 0;
    for (let i = board.height; i > 0; i--){
        for(let j = 0; j < board.width; j++){
            temp = temp + board[i][j];
        }
        console.log(temp);
        if (temp == 10){
            copyLine(i);
        }
        temp = 0;
    }
}

function resetGame(){
    if(piece.y==0){
        clearBoard();
        random = Math.floor(Math.random()*PIECES.length)
        piece = new Piece(PIECES[random][0],PIECES[random][1]);
    }
}

function drawGame(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
}

function updateGame(){
    clearLine();
    drawGame();
    moveDown();
}

drawGame();
setInterval(updateGame,1000);