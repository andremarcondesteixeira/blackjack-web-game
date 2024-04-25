import { strict as assert } from "node:assert";
import { beforeEach, suite, test } from "node:test";
import { Game } from "../game.js";
import { Lobby_State } from "../lobby_state.js";
import { make_player } from "./helpers.js";

suite("Lobby_State", () => {
  suite("happy path", () => {
    let game;

    beforeEach(() => {
      game = new Game();
    });

    test("Lobby_State is the default initial state of a game", () => {
      assert(game.state instanceof Lobby_State);
    });

    test("It starts with no players", () => {
      assert.equal(game.amount_of_players, 0);
    });

    test("Players can be added to seats 1 to 7", () => {
      game.state.add_player_to_seat(make_player({ name: "Julia", balance: 100 }), 1);
      assert.equal(game.amount_of_players, 1);
      game.state.add_player_to_seat(make_player({ name: "Bill", balance: 200 }), 7);
      assert.equal(game.amount_of_players, 2);
      game.state.add_player_to_seat(make_player({ name: "Carl", balance: 300 }), 4);
      assert.equal(game.amount_of_players, 3);
      game.state.add_player_to_seat(make_player({ name: "Jeff", balance: 400 }), 2);
      assert.equal(game.amount_of_players, 4);
      game.state.add_player_to_seat(make_player({ name: "Suzuki", balance: 500 }), 3);
      assert.equal(game.amount_of_players, 5);
      game.state.add_player_to_seat(make_player({ name: "Sigfried", balance: 600 }), 5);
      assert.equal(game.amount_of_players, 6);
      game.state.add_player_to_seat(make_player({ name: "Matias", balance: 700 }), 6);
      assert.equal(game.amount_of_players, 7);
    });

    test("Players can be removed", () => {
      game.state.add_player_to_seat(make_player(), 1);
      assert.equal(game.amount_of_players, 1);
      game.state.remove_player_on_seat(1);
      assert.equal(game.amount_of_players, 0);
    });

    test("Default amount of decks is 1", () => {
      assert.equal(game.amount_of_decks, 1);
    });

    test("Amount of decks can be configured", () => {
      game.state.set_amount_of_decks(2);
      assert.equal(game.amount_of_decks, 2);
    });
  });

  suite("validation", () => {
    test("Cannot add more than 7 players", () => {

    });
  });
});
