const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

// Define the grid dimensions and scaling factor
const grid = { width: 10, height: 20 };
const scalar = 20;
const buffer = 3;
canvas.width = (grid.width) * scalar;
canvas.height = (grid.height) * scalar;

let score_span = document.getElementById("score");
let highscore_span = document.getElementById("highscore");

// Create the game board
const empty = "black";
const border = "gray";

//  Draw tile
function drawSquare(x,y,color) {
    c.fillStyle = color;
    c.strokeStyle = "black";
    c.fillRect(x*scalar,y*scalar,scalar,scalar);
    c.strokeRect(x*scalar,y*scalar,scalar,scalar);
}

// Draw playable board tiles
function drawBoard(){
    for (var i = 0; i < grid.height; i++){
        for (let j = 0; j < grid.width; j++){
            drawSquare(j,i,board[i+buffer][j+buffer]);
        }
    }
}

function drawGame(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
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
// starting position is ~half of board
function Piece(matrix,color){
    this.matrix = matrix;
    this.color = color;
    this.x = board[0].length/2 - 1;
    this.y = 1;
}

// Draw current piece
function drawPiece(){
    for(var i = 0; i < piece.matrix.length; i++){
        for (var j = 0; j < piece.matrix[0].length; j++){
            if (piece.matrix[i][j]){
                drawSquare(piece.x + j - buffer, piece.y + i - buffer, piece.color);
            }
        }
    }
}

//  checks for overlaps between board and piece
function checkCollision(){
    for(let i = 0; i < piece.matrix.length; i++){
        for(let j = 0; j < piece.matrix[0].length;j++){
            if((piece.matrix[i][j]==1)
                 && (board[piece.y + i][piece.x +j] != empty)){
                return true;
            }
        }
    }
    return false;
}

function moveLeft(){
    piece.x -= 1;
    if(checkCollision()){
        piece.x += 1;
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

function rotatePiece(){
    piece.matrix = transpose(piece.matrix);
    piece.matrix = mirror(piece.matrix);
    if(checkCollision()){
        piece.matrix = mirror(piece.matrix);
        piece.matrix = transpose(piece.matrix);
    }
}

function moveRight(){
    piece.x += 1;
    if(checkCollision()){
        piece.x -= 1;
    }
}

function checkRow(row){
    for(let i = 0; i < board[row].length; i++){
        if(board[row][i] == empty){
            return false;
        }
    }
    return true;
}

function clearRow(){
    for(let i = board.length - buffer - 1; i > 0; i--){
        if(checkRow(i)){
            for(let j = i; j > 0; j--){
                board[j] = board[j-1];
            }
            score = score + 100;
        }
    }
    score_span.innerHTML = score;
}

//  Reset board


function lockPiece(){
    for(let i = 0; i < piece.matrix.length; i++){
        for(let j = 0; j < piece.matrix[0].length;j++){
            if(piece.matrix[i][j]){
                board[piece.y + i][piece.x + j] = piece.color;
            }
        }
    }
}

function moveDown(){
    piece.y += 1;
    if(checkCollision()){
        piece.y -=1;
        if(piece.y < buffer){
            resetGame();
        }
        else{
            lockPiece();
            resetPiece();
        }
    }
}

// Function to control the current piece
function keyPush(event) {
    switch (event.keyCode) {
        case 37: moveLeft();
        break;
        case 38: rotatePiece();
        break;
        case 39: moveRight();
        break;
        case 40: moveDown();
        break;
    }
    drawGame();
}

//  Reset board
function resetBoard(){
    if (score > highscore) {
        highscore = score;
    }
    score = 0;
    score_span.innerHTML = score;
    highscore_span.innerHTML = highscore;

    for (var i = 0; i < grid.height + buffer + buffer; i++){
        board[i] = [];
        for (let j = 0; j < grid.width+ buffer + buffer; j++){
            board[i][j] = empty;
            if(i > grid.height + buffer - 1|| j < buffer || j > grid.width + buffer - 1){
                board[i][j] = border;
            }
        }
    }
}

function resetPiece(){
    random = Math.floor(Math.random()*PIECES.length)
    piece = new Piece(PIECES[random][0],PIECES[random][1]);
}

function resetGame(){
    resetBoard();
    resetPiece();
}

function updateGame(){
    moveDown();
    clearRow();
    drawGame();
}

document.addEventListener("keydown", keyPush);
let score = 0;
let highscore = 0;
let board = [];
let piece;
resetGame();
drawGame();
setInterval(updateGame,500);


