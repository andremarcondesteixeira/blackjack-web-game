import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { Game } from "../game.js";
import { make_player } from "./helpers.js";

suite("Game", () => {
  test("A Game object can be created", () => {
    const game = new Game({
      players: [
        make_player({
          name: "Mary",
          balance: 1000
        }),
        make_player({
          name: "John",
          balance: 1500
        })
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

  test("At least 1 player must be playing the game", () => {
    for (const players of [null, undefined, [], {}]) {
      assert.throws(() => {
        new Game({ players, amount_of_decks: 1 });
      }, `Should throw an exception when player argument is ${JSON.stringify(players)}`);
    }
  });

  test("A maximum of 7 players can join the game", () => {
    assert.throws(() => {
      const players = new Array(8).fill(make_player({ name: "Carl", balance: 1200 }));
      new Game({ players });
    });
  });
});
