import { suite, test } from "node:test";
import { Game } from "../game.js";

suite("Game", () => {
  test("A Game object can be created", () => {
    const game = new Game();
  });
});
