const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

const grid = { width: 10, height: 20 };
const scalar = 20;
canvas.width = grid.width * scalar;
canvas.height = grid.height * scalar;

const empty = "white";

function drawSquare(x,y,color) {
    c.fillStyle = color;
    c.fillRect(x*scalar,y*scalar,scalar,scalar);
    c.strokeStyle = "black";
    c.strokeRect(x*scalar,y*scalar,scalar,scalar);
}

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
drawBoard();

const PIECES = [
    ["red",[[1,1,0],[0,1,1],[0,0,0]]],
    ["green",[[0,1,1],[1,1,0],[0,0,0]]],
    ["purple",[[1,1,1],[0,1,0],[0,0,0]]],
    ["yellow",[[1,1],[1,1]]],
    ["orange",[[1,1,1],[1,0,0],[0,0,0]]],
    ["cyan",[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
    ["blue",[[1,1,1],[0,0,1],[0,0,0]]]
];

function Piece(color, matrix){
    this.matrix = matrix;
    this.color = color;
    this.x = 0;
    this.y = 0;
}

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

console.log(piece.matrix.length);
drawPiece();

/*
let player = {x: 0, y: 0, color: null, matrix: null};
function createPiece(){
    player.x = Math.floor(grid.width / 2);
    player.y = 5;
    piece = PIECES[Math.floor(Math.random() * PIECES.length)];
    color = piece[0];
    matrix = piece[1];
}



let board = [];
for (var i = 0; i < grid.width; i++){
    board[i] = [];
    for (let j = 0; j < grid.height; j++){
        board[i][j] = 0;
    }
}

function Piece(matrix, color){
    this.matrix = matrix;
    this.color = color;
    this.x = 0;
    this.y = 0;
}

function drawBoard(){
    c.clearRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < grid.width; i++){
        for (let j = 0; j < grid.height; j++){
            drawSquare(i,j,board[i][j]);
        }
    }
    
    for (var i = 0; i < player.matrix.length; i++){
        for (let j = 0; j < player.matrix.length; j++){
            drawSquare(player.x + i,player.y + j,player.color);
        }
    }
}

document.addEventListener("keydown", keyPush);

drawBoard();

*/