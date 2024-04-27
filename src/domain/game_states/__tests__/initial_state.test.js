import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { DECKS_MAX_ALLOWED_AMOUNT, PLAYERS_MAX_ALLOWED_AMOUNT } from "../../../constants.js";
import { make_garbage, make_player } from "../../../test_helpers.js";
import { serialize } from "../../../util.js";
import { Initial_State } from "../initial_state.js";
import { Players_Betting_State } from "../players_betting_state.js";

suite("Initial_State", () => {
  suite("Happy path", () => {
    test("An Initial_State object can be created", () => {
      const player = make_player();
      const game = new Initial_State({
        players: [player],
        amount_of_decks: DECKS_MAX_ALLOWED_AMOUNT,
      });
      assert.equal(game.players.length, 1);
      assert.equal(game.players[0], player);
      assert.equal(game.amount_of_decks, DECKS_MAX_ALLOWED_AMOUNT);
    });

    test("A game can be started after defining the players and the amount of decks", () => {
      const players_betting_state = new Initial_State({
        players: [make_player()],
        amount_of_decks: 1
      }).begin_game();

      assert(players_betting_state instanceof Players_Betting_State);
    });
  });

  suite("Illegal states must be unnrepresentable", () => {
    test("Players argument must be an array", () => {
      const garbage = make_garbage({ use_empty_array: false });
      for (const players of garbage) {
        assert.throws(() => {
          new Initial_State({ players, amount_of_decks: 1 });
        }, `Should throw an exception when players argument is ${serialize(players)}`);
      }
    });

    test("Players must be instances of Player", () => {
      const garbage = make_garbage();
      for (const player of garbage) {
        assert.throws(() => {
          new Initial_State({ players: [player], amount_of_decks: 1 });
        }, `Should throw an exception when player is ${serialize(player)}`);
      }
    });

    test(`A maximum of ${PLAYERS_MAX_ALLOWED_AMOUNT} players can join the game`, () => {
      assert.throws(() => {
        new Initial_State({
          players: new Array(PLAYERS_MAX_ALLOWED_AMOUNT + 1).fill(make_player()),
          amount_of_decks: 1
        });
      });
    });

    test(`Amount of decks must be a number bigger than zero`, () => {
      const garbage = make_garbage({ use_positive_numbers_except_zero: false });
      for (const amount_of_decks of garbage) {
        assert.throws(
          () => new Initial_State({ players: [make_player()], amount_of_decks }),
          `Should throw an exception when amount of decks is ${serialize(amount_of_decks)}`
        )
      }
    });

    test("Amount of decks must be an integer", () => {
      assert.throws(() => {
        new Initial_State({
          players: [make_player()],
          amount_of_decks: 1.9
        });
      });
    });

    test(`A maximum of ${DECKS_MAX_ALLOWED_AMOUNT} decks can be used`, () => {
      assert.throws(() => {
        new Initial_State({
          players: [make_player()],
          amount_of_decks: DECKS_MAX_ALLOWED_AMOUNT + 1
        });
      });
    });
  });
});
