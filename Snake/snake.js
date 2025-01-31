let canvas = document.getElementById("grid");
let c = canvas.getContext("2d");

const grid = { width: 20, height: 20 };
const box = 20
canvas.width = grid.width * box;
canvas.height = grid.height * box;

let apple = { x: 0, y: 0 };

let snake_trail = [];
let snake_x, snake_y;
let snake_dx, snake_dy;

canvas.width = grid.width * box;
canvas.height = grid.height * box;

let score_span = document.getElementById("score");
let highscore_span = document.getElementById("highscore");

window.onload = function () {
    highscore = 0;
    document.addEventListener("keydown", keyPush);
    resetGame();
    setInterval(game, 100);
}

function resetGame() {
    if (score > highscore) {highscore = score;}
    score = 0;
    score_span.innerHTML = score;
    highscore_span.innerHTML = highscore;


    snake_x = Math.floor(Math.random() * canvas.width / box);
    snake_y = Math.floor(Math.random() * canvas.height / box);
    snake_dx = 0;
    snake_dy = 0;
    apple.x = Math.floor(Math.random() * canvas.width / box);
    apple.y = Math.floor(Math.random() * canvas.height / box);
    initial_length = 5;
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37: if (snake_dx != 1){snake_dx = -1;snake_dy = 0;}break;
        case 38: if (snake_dy != 1){snake_dx = 0;snake_dy = -1;}break;
        case 39: if (snake_dx != -1){snake_dx = 1;snake_dy = 0;}break;
        case 40: if (snake_dy != -1){snake_dx = 0;snake_dy = 1;}break;
    }
}

function game() {
    snake_x += snake_dx;
    snake_y += snake_dy;
    
    checkSnake();
    updateFrame();
}

function checkSnake(){
    //snake out of bound
    if (snake_x < 0 || snake_y < 0 || snake_x > grid.width-1 || snake_y > grid.height-1){
        resetGame();
    }

    //snake eats itself
    for (var i = 1; i < snake_trail.length -1;i++){
        if(snake_dx==0 && snake_dy==0){break;}
        if(snake_trail[i].x==snake_x && snake_trail[i].y == snake_y){
            resetGame();
        }
    }

    //snake eats apple
    if (apple.x == snake_x && apple.y == snake_y) {
        score++;
        score_span.innerHTML = score;
        apple.x = Math.floor(Math.random() * (grid.width - 1) );
        apple.y = Math.floor(Math.random() * (grid.height - 1) );
    }
}

function updateFrame() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw snake
    c.fillStyle = "lime";
    for (var i = 0; i < snake_trail.length; i++) {
        c.fillRect(
            snake_trail[i].x * box,
            snake_trail[i].y * box,
            box - 2,
            box - 2
        );
    }

    // move snake data
    snake_trail.push({x: snake_x,y: snake_y});
    while (snake_trail.length > initial_length + score) {
        snake_trail.shift();
    }

    // draw apple
    c.fillStyle = "red";
    c.fillRect(apple.x * box,apple.y * box,box - 2,box - 2);
}