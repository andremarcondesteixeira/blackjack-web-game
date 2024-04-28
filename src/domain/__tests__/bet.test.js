import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { make_garbage } from "../../test_helpers.js";
import { name_of } from "../../util.js";
import { Bet } from "../bet.js";

suite(name_of(Bet), () => {
  suite("Happy path", () => {
    test(`A new ${name_of(Bet)} object can be created`, () => {
      const bet = new Bet({
        player_id: 1,
        value: 100
      });
      assert.equal(bet.player_id, 1);
      assert.equal(bet.value, 100);
    });
  });

  suite("Illegal states must be unrepresentable", () => {
    test("Player ID must be a positive integer", () => {
      const garbage = make_garbage({ use_positive_numbers_except_zero: false });
      for (const player_id of garbage) {
        assert.throws(() => {
          new Bet({
            player_id,
            value: 200
          });
        });
      }
    });

    test("Value must be a positive integer", () => {
      const garbage = make_garbage({ use_positive_numbers_except_zero: false });
      for (const value of garbage) {
        assert.throws(() => {
          new Bet({
            player_id: 1,
            value
          });
        });
      }
    });
  });
});
