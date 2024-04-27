import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { make_player } from "../../../test_helpers.js";
import { name_of } from "../../../util.js";
import { make_shuffled_decks } from "../../card.js";
import { Initial_Bets_State } from "../initial_bets_state.js";

suite(name_of(Initial_Bets_State), () => {
  suite("Happy path", () => {
    test(`A new ${name_of(Initial_Bets_State)} object can be created`, () => {
      const player = make_player();
      const state = new Initial_Bets_State({
        players: [player],
        cards: make_shuffled_decks(1)
      });

      assert.equal(state.players[0].name, player.name);
      assert.equal(state.players[0].balance, player.balance);
      assert.equal(state.cards.length, 52);
    });
  });
});
