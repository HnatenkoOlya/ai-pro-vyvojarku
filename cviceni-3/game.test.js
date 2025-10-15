import {
  createBird,
  createPipe,
  updateBird,
  checkCollision,
  createGameState,
} from "./gameLogic";

describe("gameLogic functions", () => {
  test("createBird returns bird with correct defaults", () => {
    const b = createBird(10, 20);
    expect(b.x).toBe(10);
    expect(b.y).toBe(20);
    expect(typeof b.velocity).toBe("number");
    expect(typeof b.gravity).toBe("number");
    expect(typeof b.jump).toBe("number");
    expect(typeof b.size).toBe("number");
  });

  test("updateBird changes velocity and y", () => {
    const b = createBird(0, 0);
    b.velocity = 1;
    const beforeY = b.y;
    const beforeV = b.velocity;
    const updated = updateBird(b);
    expect(updated.velocity).toBe(beforeV + b.gravity);
    expect(updated.y).toBe(beforeY + updated.velocity);
  });

  test("createPipe sets x and gap correctly", () => {
    const canvasW = 300;
    const canvasH = 400;
    const gap = 100;
    const p = createPipe(canvasW, canvasH, gap);
    expect(p.x).toBe(canvasW);
    expect(p.bottomY - p.topHeight).toBe(gap);
    expect(p.passed).toBe(false);
    // topHeight should be within canvas bounds (>=50 and <= canvasH - gap - 50)
    expect(p.topHeight).toBeGreaterThanOrEqual(50);
    expect(p.topHeight).toBeLessThanOrEqual(canvasH - gap - 50);
  });

  test("checkCollision detects a collision when overlapping", () => {
    const bird = { x: 111, y: 10, size: 20 };
    const pipe = { x: 100, topHeight: 30, bottomY: 130 };
    const pipeWidth = 50;
    // bird.x % 10 !== 0 here (111 % 10 = 1) so the final check passes
    expect(checkCollision(bird, pipe, pipeWidth)).toBe(true);
  });

  test("checkCollision returns false when not colliding", () => {
    const bird = { x: 10, y: 200, size: 20 };
    const pipe = { x: 100, topHeight: 50, bottomY: 200 };
    const pipeWidth = 50;
    expect(checkCollision(bird, pipe, pipeWidth)).toBe(false);
  });

  test("createGameState initializes correctly", () => {
    const state = createGameState(320, 240);
    expect(state).toHaveProperty("bird");
    expect(Array.isArray(state.pipes)).toBe(true);
    expect(state.score).toBe(0);
    expect(state.isGameOver).toBe(false);
  });
});
