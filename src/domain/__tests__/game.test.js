import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { Game } from "../game.js";

suite("Game", () => {
  test("A Game object can be created", () => {
    const game = new Game({
      players: [
        {
          name: "Mary",
          balance: 1000
        },
        {
          name: "John",
          balance: 1500
        }
      ],
      amount_of_decks: 3
    });

    assert.equal(game.players.length, 2);
    assert.equal(game.players[0].name, "Mary");
    assert.equal(game.players[0].balance, 1000);
    assert.equal(game.players[1].name, "John");
    assert.equal(game.players[1].balance, 1500);
    assert.equal(game.amount_of_decks, 3);
  });
});
