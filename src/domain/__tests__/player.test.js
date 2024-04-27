import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { serialize } from "../../util.js";
import { Player } from "../player.js";
import { make_garbage } from "../../test_helpers.js";

suite("Player", () => {
  test("A new Player object can be created", () => {
    const player = new Player({ name: "Robert", balance: 5200 });
    assert.equal(player.name, "Robert");
    assert.equal(player.balance.value, 5200);
  });

  suite("Illegal states must be unrepresentable", () => {
    test("A player must have a name", () => {
      const garbage = make_garbage({ use_random_string: false });
      for (const name of garbage) {
        assert.throws(() => {
          new Player({ name, balance: 100 });
        }, `Should throw exception when player name is ${serialize(name)}`);
      }
    });

    test("A player's balance must be a finite number greater than or equal to 0, or null, or undefined", () => {
      const garbage = make_garbage({
        use_positive_numbers_except_zero: false,
        use_zero: false,
        use_null: false,
        use_undefined: false,
      });
      for (const balance of garbage) {
        assert.throws(() => {
          new Player({ name: "Claudia", balance });
        }, `Should throw exception when player's balance is ${serialize(balance)}`);
      }
    });
  });
});
