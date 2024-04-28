import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { make_bets, make_garbage, make_player } from "../../../test_helpers.js";
import { name_of, serialize } from "../../../util.js";
import { Card, Faces, Suits, make_shuffled_decks } from "../../card.js";
import { Initial_Bets_State } from "../initial_bets_state.js";

suite(name_of(Initial_Bets_State), () => {
  suite("Happy path", () => {
    test(`A new ${name_of(Initial_Bets_State)} object can be created`, () => {
      const player = make_player();
      const players = [player];
      const bets = make_bets(players);
      const state = new Initial_Bets_State({
        players,
        decks: make_shuffled_decks(1),
        bets
      });

      assert.equal(state.players[0].name, player.name);
      assert.equal(state.players[0].balance, player.balance);
      assert.equal(state.decks.length, 52);
    });
  });

  suite("Illegal states must be unrepresentable", () => {
    test("Players must be an array of Player instances", () => {
      const garbage = make_garbage();
      for (const player of garbage) {
        assert.throws(() => {
          new Initial_Bets_State({
            players: [player],
            decks: make_shuffled_decks(1),
            bets: []
          });
        }, `should throw an exception when player is ${serialize(player)}`);
      }
    });

    test("Cards must be an array of Card instances", () => {
      const garbage = make_garbage();
      for (const card of garbage) {
        assert.throws(() => {
          new Initial_Bets_State({
            players: [make_player()],
            decks: [card],
            bets: []
          });
        }, `should throw an exception when card is ${serialize(card)}`);
      }
    });

    test("Bets must be an array of Bet instances", () => {
      const garbage = make_garbage();
      for (const bet of garbage) {
        assert.throws(() => {
          new Initial_Bets_State({
            players: [make_player()],
            decks: [new Card({ face_name: Faces[10], suit: Suits.clubs })],
            bets: [bet]
          });
        }, `should throw an exception when card is ${serialize(bet)}`);
      }
    });

    test("All players must place their initial bets before the dealer can deal the initial cards", () => {
      const state = new Initial_Bets_State({
        players: [make_player()],
        decks: make_shuffled_decks(1),
        bets: []
      });
    })
  });
});
