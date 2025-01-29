let score_span = document.getElementById("score");
let highscore_span = document.getElementById("highscore");

let canvas = document.getElementById("grid");
let c = canvas.getContext("2d");

let snake_trail = [];
let snake_x, snake_y;
let snake_dx, snake_dy;
let apple_x, apple_y;
let initial_length;

let tile_size = 20;
let grid_dimension =20;
canvas.width = grid_dimension * tile_size;
canvas.height = grid_dimension * tile_size;

window.onload = function () {
    highscore = 0;

    gameReset();
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
}

function gameReset() {
    if (score > highscore) {highscore = score;}
    score = 0;
    score_span.innerHTML = 0;
    highscore_span.innerHTML = highscore;

    snake_x = Math.floor(Math.random() * canvas.width / tile_size);
    snake_y = Math.floor(Math.random() * canvas.height / tile_size);
    snake_dx = 0;
    snake_dy = 0;
    apple_x = Math.floor(Math.random() * canvas.width / tile_size);
    apple_y = Math.floor(Math.random() * canvas.height / tile_size);
    initial_length = 5;
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            if (snake_dx != 1){
                snake_dx = -1;
                snake_dy = 0;
            }
            break;
        case 38:
            if (snake_dy != 1){
                snake_dx = 0;
                snake_dy = -1;
            }
            break;
        case 39:
            if (snake_dx != -1){
                snake_dx = 1;
                snake_dy = 0;
            }
            break;
        case 40:
            if (snake_dy != -1){
                snake_dx = 0;
                snake_dy = 1;
            }
            break;
    }
}

function game() {
    width = 100

    snake_x += snake_dx;
    snake_y += snake_dy;
    
    checkSnake();
    drawBackground();
    drawSnake();
    drawApple();
}

function checkSnake(){
    //snake out of bound
    if (snake_x < 0 || snake_y < 0 || snake_x > grid_dimension-1 || snake_y > grid_dimension-1){
        gameReset();
    }

    //snake eats itself
    for (var i = 1; i < snake_trail.length -1;i++){
        if(snake_dx==0 && snake_dy==0){break;}
        if(snake_trail[i].x==snake_x && snake_trail[i].y == snake_y){
            gameReset();
        }
    }

    //snake eats apple
    if (apple_x == snake_x && apple_y == snake_y) {
        score++;
        score_span.innerHTML = score;
        apple_x = Math.floor(Math.random() * grid_dimension);
        apple_y = Math.floor(Math.random() * grid_dimension);
    }
}

function drawBackground() {
    c.strokeStyle = "black";
    c.fillStyle = "green";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    c.fillStyle = "lime";
    for (var i = 0; i < snake_trail.length; i++) {
        c.fillRect(
            snake_trail[i].x * tile_size,
            snake_trail[i].y * tile_size,
            tile_size - 2,
            tile_size - 2
        );
    }

    snake_trail.push({x: snake_x,y: snake_y});
    while (snake_trail.length > initial_length + score) {
        snake_trail.shift();
    }
}

function drawApple() {
    c.fillStyle = "red";
    c.fillRect(
        apple_x * tile_size,
        apple_y * tile_size,
        tile_size - 2,
        tile_size - 2
    );
}