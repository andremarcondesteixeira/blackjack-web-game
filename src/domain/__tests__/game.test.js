import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { serialize } from "../../util.js";
import { Game } from "../game.js";
import { make_garbage, make_player } from "./helpers.js";

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
    const garbage = make_garbage({ do_not_include_empty_array: true });
    for (const players of garbage) {
      assert.throws(() => {
        new Game({ players, amount_of_decks: 1 });
      }, `Should throw an exception when players argument is ${serialize(players)}`);
    }
  });

  test("Players must be instances of Player", () => {
    const garbage = make_garbage();
    for (const player of garbage) {
      assert.throws(() => {
        new Game({ players: [player], amount_of_decks: 1 });
      }, `Should throw an exception when player is ${serialize(player)}`);
    }
  });

  test("A maximum of 7 players can join the game", () => {
    assert.throws(() => {
      const players = new Array(8).fill(make_player());
      new Game({ players, amount_of_decks: 1 });
    });
  });

  test(`Amount of decks must be a positive integer`, () => {
    const garbage = make_garbage({ do_not_include_positive_numbers_except_zero: true });
    for (const amount_of_decks of garbage) {
      assert.throws(
        () => new Game({ players: [make_player()], amount_of_decks }),
        `Should throw an exception when amount of decks is ${serialize(amount_of_decks)}`
      )
    }
  });
});
