(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("score");
  const restartBtn = document.getElementById("restart");

  const tileCount = 20; // grid per row/col
  const tileSize = canvas.width / tileCount;
  let snake = [];
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let apple = { x: 10, y: 10 };
  let score = 0;
  let gameOver = false;
  let speed = 2; // frames per second
  let frameAcc = 0;
  let lastTime = 0;

  function reset() {
    // Obnoví počáteční stav hry: pozici hada, jablko, skóre, rychlost a časovače
    snake = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    apple = randomApple();
    score = 0;
    gameOver = false;
    scoreEl.textContent = "Score: 0";
    // restore initial speed and timing accumulators so restarts don't
    // continue with a previously increased speed or leftover frameAcc
    speed = 6; // frames per second (default)
    frameAcc = 0;
    lastTime = 0;
  }

  function randomApple() {
    // Vrátí náhodnou pozici jablka, která není na těle hada
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
    return pos;
  }

  function gameLoop(ts) {
    // Hlavní smyčka animace volaná pomocí requestAnimationFrame;
    // řídí vykreslování podle nastavené rychlosti (fps)
    if (!lastTime) lastTime = ts;
    const delta = ts - lastTime;
    lastTime = ts;
    frameAcc += delta;
    const interval = 1000 / speed;
    if (frameAcc >= interval) {
      frameAcc -= interval;
      update();
      draw();
    }
    requestAnimationFrame(gameLoop);
  }

  function update() {
    // Aktualizuje herní stav: posun hlavy hada, kontrola kolizí a sebrání jablka
    if (gameOver) return;
    // apply direction (prevent reverse)
    dir = nextDir;
    const head = {
      x: (snake[0].x + dir.x + tileCount) % tileCount,
      y: (snake[0].y + dir.y + tileCount) % tileCount,
    };

    // check self-collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      gameOver = true;
      return;
    }

    snake.unshift(head);

    // apple eaten
    if (head.x === apple.x && head.y === apple.y) {
      score++;
      scoreEl.textContent = "Score: " + score;
      apple = randomApple();
      // optional: increase speed slightly
      if (score % 5 === 0) speed = Math.min(20, speed + 1);
    } else {
      snake.pop();
    }
  }

  function draw() {
    // Vykreslí herní plátno: pozadí, jablko, hada a případné překrytí Game Over
    // clear
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw apple
    ctx.fillStyle = "#e44";
    roundRect(
      apple.x * tileSize,
      apple.y * tileSize,
      tileSize,
      tileSize,
      4,
      true
    );

    // draw snake
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#8ef" : "#3ab";
      roundRect(
        snake[i].x * tileSize,
        snake[i].y * tileSize,
        tileSize,
        tileSize,
        4,
        true
      );
    }

    // game over overlay
    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 6);
      ctx.font = "14px sans-serif";
      ctx.fillText("Stiskni Restart", canvas.width / 2, canvas.height / 2 + 18);
    }
  }

  function roundRect(x, y, w, h, r, fill) {
    // Pomocná funkce pro vykreslení zaobleného obdélníku (např. pro políčka hada/jablka)
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
  }

  // Sleduje stisky kláves pro ovládání směru hada a restart pomocí mezerníku
  window.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "ArrowUp" || key === "w" || key === "W") {
      if (dir.y !== 1) nextDir = { x: 0, y: -1 };
    } else if (key === "ArrowDown" || key === "s" || key === "S") {
      if (dir.y !== -1) nextDir = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" || key === "a" || key === "A") {
      if (dir.x !== 1) nextDir = { x: -1, y: 0 };
    } else if (key === "ArrowRight" || key === "d" || key === "D") {
      if (dir.x !== -1) nextDir = { x: 1, y: 0 };
    } else if (key === " " && gameOver) {
      reset();
    }
  });

  // Připojí tlačítko Restart k funkci reset, která znovu spustí hru
  restartBtn.addEventListener("click", () => reset());

  // start
  reset();
  requestAnimationFrame(gameLoop);
})();
