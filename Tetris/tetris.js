const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

// Define the grid dimensions and scaling factor
const grid = { width: 10, height: 20 };
const scalar = 20;
canvas.width = grid.width * scalar;
canvas.height = grid.height * scalar;
function drawSquare(x,y,color) {
    c.fillStyle = color;
    c.fillRect(x*scalar,y*scalar,scalar,scalar);
    c.strokeStyle = "black";
    c.strokeRect(x*scalar,y*scalar,scalar,scalar);
}

// Create the game board and initialize it with empty cells
const empty = "white";
let board = [];
for (var i = 0; i < grid.width; i++){
    board[i] = [];
    for (let j = 0; j < grid.height; j++){
        board[i][j] = empty;
    }
}
function drawBoard(){
    for (var i = 0; i < grid.width; i++){
        for (let j = 0; j < grid.height; j++){
            drawSquare(i,j,board[i][j]);
        }
    }
}

// Define the Tetris pieces and their colors
const PIECES = [
    ["red",[[1,1,0],[0,1,1],[0,0,0]]],
    ["green",[[0,1,1],[1,1,0],[0,0,0]]],
    ["purple",[[1,1,1],[0,1,0],[0,0,0]]],
    ["yellow",[[1,1],[1,1]]],
    ["orange",[[1,1,1],[1,0,0],[0,0,0]]],
    ["cyan",[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
    ["blue",[[1,1,1],[0,0,1],[0,0,0]]]
];

// Constructor function for a Tetris piece
function Piece(color, matrix){
    this.matrix = matrix;
    this.color = color;
    this.x = 0;
    this.y = 0;
}

// Function to draw the current piece on the board
let piece = new Piece(PIECES[0][0],PIECES[0][1]);
function drawPiece(){
    for(var i = 0; i < piece.matrix.length; i++){
        for (var j = 0; j < piece.matrix.length; j++){
            if (piece.matrix[j][i]){
                drawSquare(piece.x + i,piece.y + j,piece.color);
            }
        }
    }
}



function updateFrame(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
}

setInterval(updateFrame,1000);