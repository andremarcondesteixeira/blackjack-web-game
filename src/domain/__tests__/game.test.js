import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { Game } from "../game.js";
import { Lobby_State } from "../lobby_state.js";
import { make_player } from "./helpers.js";

suite("Game", () => {
  test("A Game object can be created", () => {
    const game = new Game();
    assert.equal(game.amount_of_players, 0);
    assert.equal(game.amount_of_decks, 1);
    assert(game.state instanceof Lobby_State);
  });

  test.skip("At least 1 player must be playing the game", () => {
    for (const players of [null, undefined, [], {}]) {
      assert.throws(() => {
        new Game({ players, amount_of_decks: 1 });
      }, `Should throw an exception when player argument is ${JSON.stringify(players)}`);
    }
  });

  test.skip("A maximum of 7 players can join the game", () => {
    assert.throws(() => {
      const players = new Array(8).fill(make_player({ name: "Carl", balance: 1200 }));
      new Game({ players });
    });
  });
});
