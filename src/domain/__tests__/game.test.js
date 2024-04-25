import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { Game } from "../game.js";
import { create_garbage, make_player, serialize_garbage } from "./helpers.js";

suite("Game", () => {
  test("A Game object can be created", () => {
    const player = make_player();
    const game = new Game({
      players: [player],
      amount_of_decks: 2,
    });
    assert.equal(game.players.length, 1);
    assert.equal(game.players[0], player);
    assert.equal(game.amount_of_decks, 2);
  });

  test("Players argument must be an array", () => {
    const garbage = create_garbage({ do_not_include_empty_array: true });
    for (const players of garbage) {
      assert.throws(() => {
        new Game({ players, amount_of_decks: 1 });
      }, `Should throw an exception when players argument is ${serialize_garbage(players)}`);
    }
  });

  test("Players must be instances of Player", () => {
    const garbage = create_garbage();
    for (const player of garbage) {
      assert.throws(() => {
        new Game({ players: [player], amount_of_decks: 1 });
      }, `Should throw an exception when player is ${serialize_garbage(player)}`);
    }
  });

  test.skip("A maximum of 7 players can join the game", () => {
    assert.throws(() => {
      const players = new Array(8).fill(make_player({ name: "Carl", balance: 1200 }));
      new Game({ players });
    });
  });
});
