document.addEventListener("DOMContentLoaded", function(){
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
});


const board_border= 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x:200, y:200}, 
    {x:190, y:200}, 
    {x:180, y:200}, 
    {x:170, y:200}, 
    {x:160, y:200,}
];

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const gameboard = document.getElementById("gameboard");
const gameboard_ctx = gameboard.getContext("2d");

main();

gen_food();

document.addEventListener("keydown", change_direction);

function main(){

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick()
    {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();

    main();
    }, 100)
}

function clear_board(){
    gameboard_ctx.fillStyle = 'green';
    gameboard_ctx.strokestyle = board_border;
    gameboard_ctx.fillRect(0, 0, gameboard.width, gameboard.height);
    gameboard_ctx.strokeRect(0, 0, gameboard.width, gameboard.height);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function drawFood(){
    gameboard_ctx.fillStyle = 'red';
    gameboard_ctx.strokestyle = 'darkred';
    gameboard_ctx.fillRect(food_x, food_y, 10, 10);
    gameboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart){
    gameboard_ctx.fillStyle = 'lightgreen';
    gameboard_ctx.strokestyle = 'darkgreen';
    gameboard_ctx.fillRect(snakePart.x, snakePart.y, snake.length, snake.length);
    gameboard_ctx.strokeRect(snakePart.x, snakePart.y, snake.length, snake.length);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameboard.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food(){
    food_x = random_food(0, gameboard.width - 10);
    food_y = random_food(0, gameboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;


    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight){
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft){
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp){
        dx = 0;
        dy = 10;
    }
}

const head = {x: snake[0].x + dx, y: snake[0].y + dy};

function move_snake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && 
    snake[0].y === food_y;
    if (has_eaten_food){
        score += 1;

        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }

}


setTimeout(function onTick() { clearCanvas(); move_snake(); drawSnake();});
setTimeout(function onTick() { clearCanvas(); move_snake(); drawSnake();});

