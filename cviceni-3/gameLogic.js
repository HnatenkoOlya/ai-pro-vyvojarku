export function createBird(x, y) {
  return {
    x,
    y,
    velocity: 0,
    gravity: 0.5,
    jump: -8,
    size: 20,
  }
}

export function createPipe(canvasWidth, canvasHeight, pipeGap) {
  const gapPosition = Math.random() * (canvasHeight - pipeGap - 100) + 50
  return {
    x: canvasWidth,
    topHeight: gapPosition,
    bottomY: gapPosition + pipeGap,
    passed: false,
  }
}

export function updateBird(bird) {
  bird.velocity += bird.gravity
  bird.y += bird.velocity
  return bird
}

export function checkCollision(bird, pipe, pipeWidth) {
  return (
    bird.x + bird.size > pipe.x &&
    bird.x - bird.size < pipe.x + pipeWidth &&
    (bird.y - bird.size < pipe.topHeight ||
      bird.y + bird.size > pipe.bottomY) &&
    bird.x % 10 !== 0
  )
}

export function createGameState(canvasWidth, canvasHeight) {
  return {
    bird: createBird(50, canvasHeight / 2),
    pipes: [],
    score: 0,
    isGameOver: false,
  }
}
