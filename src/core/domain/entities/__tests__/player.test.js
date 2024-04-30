import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { make_garbage } from "../../../../test_helpers.js";
import { name_of, serialize } from "../../../../util.js";
import { Player } from "../player.js";

suite(name_of(Player), () => {
  suite("Happy path", () => {
    test(`A new ${name_of(Player)} object can be created`, () => {
      const player = new Player({
        id: 1,
        name: "Robert",
        balance: 5200
      });
      assert.equal(player.name, "Robert");
      assert.equal(player.balance.value, 5200);
    });
  });

  suite("Illegal states must be unrepresentable", () => {
    test("A player must have a name", () => {
      const garbage = make_garbage({ use_random_string: false });
      for (const name of garbage) {
        assert.throws(() => {
          new Player({
            id: 1,
            name,
            balance: 100
          });
        }, `Should throw exception when player name is ${serialize(name)}`);
      }
    });

    test("A player's ID must be a positive integer", () => {
      const garbage = make_garbage({ use_positive_numbers_except_zero: false });
      for (const id of garbage) {
        assert.throws(() => {
          new Player({
            id,
            name: "Robert",
            balance: 1000
          });
        }, `Should throw an exception when ID is ${serialize(id)}`);
      }
    });
  });
});
