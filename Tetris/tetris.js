const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');

// Grid dimensions
const grid = { width: 10, height: 20 };
const scalar = 20;
canvas.width = grid.width * scalar;
canvas.height = grid.height * scalar;

let board = grid;
let player = { x: 5, y: 0 };

function drawSquare(x,y,color) {
    c.fillStyle = color;
    c.fillRect(x*scalar,y*scalar,scalar-2,scalar-2);
}

function updatePlayer(){
    player.y += 1;
}

function updateFrame(){
    c.clearRect(0,0,canvas.width,canvas.height);
    drawSquare(player.x,player.y,"black");
}

function game() {
    updatePlayer();
    updateFrame();
    //updateScore();
}

setInterval(game, 1000);