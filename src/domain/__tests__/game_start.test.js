import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { serialize } from "../../util.js";
import { DECKS_MAX_ALLOWED_AMOUNT, Game_Start, PLAYERS_MAX_ALLOWED_AMOUNT } from "../game_start.js";
import { make_garbage, make_player } from "./helpers.js";

suite("Game_Start", () => {
  suite("Happy path", () => {
    test("A Game_Start object can be created", () => {
      const player = make_player();
      const game = new Game_Start({
        players: [player],
        amount_of_decks: DECKS_MAX_ALLOWED_AMOUNT,
      });
      assert.equal(game.players.length, 1);
      assert.equal(game.players[0], player);
      assert.equal(game.amount_of_decks, DECKS_MAX_ALLOWED_AMOUNT);
    });
  });

  suite("Illegal states must be unnrepresentable", () => {
    test("Players argument must be an array", () => {
      const garbage = make_garbage({ do_not_include_empty_array: true });
      for (const players of garbage) {
        assert.throws(() => {
          new Game_Start({ players, amount_of_decks: 1 });
        }, `Should throw an exception when players argument is ${serialize(players)}`);
      }
    });

    test("Players must be instances of Player", () => {
      const garbage = make_garbage();
      for (const player of garbage) {
        assert.throws(() => {
          new Game_Start({ players: [player], amount_of_decks: 1 });
        }, `Should throw an exception when player is ${serialize(player)}`);
      }
    });

    test(`A maximum of ${PLAYERS_MAX_ALLOWED_AMOUNT} players can join the game`, () => {
      assert.throws(() => {
        new Game_Start({
          players: new Array(PLAYERS_MAX_ALLOWED_AMOUNT + 1).fill(make_player()),
          amount_of_decks: 1
        });
      });
    });

    test(`Amount of decks must be a number bigger than zero`, () => {
      const garbage = make_garbage({ do_not_include_positive_numbers_except_zero: true });
      for (const amount_of_decks of garbage) {
        assert.throws(
          () => new Game_Start({ players: [make_player()], amount_of_decks }),
          `Should throw an exception when amount of decks is ${serialize(amount_of_decks)}`
        )
      }
    });

    test("Amount of decks must be an integer", () => {
      assert.throws(() => {
        new Game_Start({
          players: [make_player()],
          amount_of_decks: 1.9
        });
      });
    });

    test(`A maximum of ${DECKS_MAX_ALLOWED_AMOUNT} decks can be used`, () => {
      assert.throws(() => {
        new Game_Start({
          players: [make_player()],
          amount_of_decks: DECKS_MAX_ALLOWED_AMOUNT + 1
        });
      });
    });
  });
});
