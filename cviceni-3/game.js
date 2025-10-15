import {
  createGameState,
  createPipe,
  updateBird,
  checkCollision,
} from "./gameLogic.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const gameOverDiv = document.getElementById("game-over");

const pipeGap = 150;
const pipeWidth = 50;
const pipeSpacing = 200;

let gameState;
let gameLoop;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

document.addEventListener("click", jump);

// Add this near the top with other event listeners
document.getElementById("restart-button").addEventListener("click", startGame);

// Funkce pro skok ptáka (nastaví rychlost ptáka na hodnotu skoku)
function jump() {
  if (gameState.isGameOver) return;
  gameState.bird.velocity = gameState.bird.jump;
}

// Hlavní funkce pro aktualizaci stavu hry (pohybuje ptákem, trubkami, kontroluje kolize a skóre)
function updateGame() {
  gameState.bird = updateBird(gameState.bird);

  if (
    gameState.pipes.length === 0 ||
    gameState.pipes[gameState.pipes.length - 1].x < canvas.width - pipeSpacing
  ) {
    gameState.pipes.push(createPipe(canvas.width, canvas.height, pipeGap));
  }

  gameState.pipes.forEach((pipe) => {
    pipe.x -= 2;

    if (!pipe.passed && pipe.x + pipeWidth < gameState.bird.x) {
      gameState.score += 2;
      scoreElement.textContent = `Score: ${gameState.score}`;
      pipe.passed = true;
    }

    if (checkCollision(gameState.bird, pipe, pipeWidth)) {
      gameOver();
    }
  });

  gameState.pipes = gameState.pipes.filter((pipe) => pipe.x > -pipeWidth);

  if (gameState.bird.y + gameState.bird.size > canvas.height) {
    gameOver();
  }

  draw();
}

// Funkce pro vykreslení celé hry na plátno (pták, trubky, skóre)
function draw() {
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    gameState.bird.x,
    gameState.bird.y,
    gameState.bird.size,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "green";
  gameState.pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
  });
}

// Funkce pro ukončení hry (nastaví příznak game over a zobrazí obrazovku game over)
function gameOver() {
  gameState.isGameOver = true;
  gameOverDiv.style.display = "block";
  document.getElementById("final-score").textContent = gameState.score;
  cancelAnimationFrame(gameLoop);
}

// Funkce pro spuštění nové hry (resetuje stav hry a spustí hlavní smyčku)
function startGame() {
  gameState = createGameState(canvas.width, canvas.height);
  gameOverDiv.style.display = "none";
  scoreElement.textContent = "Score: 0";

  gameLoop = requestAnimationFrame(function update() {
    updateGame();
    if (!gameState.isGameOver) {
      requestAnimationFrame(update);
    }
  });
}

startGame();
