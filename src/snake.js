const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let snakeLength = 1;
let snakeDirection = 'RIGHT';
let food = { x: 0, y: 0 };
let gameInterval;

function initializeGame() {
    snake = [{ x: 2, y: 2 }];
    snakeLength = 1;
    snakeDirection = 'RIGHT';
    generateFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    }
}

function moveSnake() {
    let head = { ...snake[0] };

    switch (snakeDirection) {
        case 'UP':
            head.y--;
            break;
        case 'DOWN':
            head.y++;
            break;
        case 'LEFT':
            head.x--;
            break;
        case 'RIGHT':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows)
    };
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        initializeGame();
        return;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            initializeGame();
            return;
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            if (snakeDirection !== 'DOWN') snakeDirection = 'UP';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'UP') snakeDirection = 'DOWN';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
            break;
    }
});

export default initializeGame
