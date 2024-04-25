import { Player } from "../player.js";
import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { create_garbage, serialize_garbage } from "./helpers.js";

suite("Player", () => {
  test("A new Player object can be created", () => {
    const player = new Player({ name: "Robert", balance: 5200 });
    assert.equal(player.name, "Robert");
    assert.equal(player.balance.value, 5200);
  });

  suite("Validation", () => {
    test("A player must have a name", () => {
      const garbage = create_garbage();
      for (const name of garbage) {
        assert.throws(() => {
          new Player({ name, balance: 100 });
        }, `Should throw exception when player name is ${serialize_garbage(name)}`);
      }
    });

    test("A player's balance must be a finite number greater than or equal to 0, or null, or undefined", () => {
      const garbage = create_garbage({
        do_not_include_positive_numbers_except_zero: true,
        do_not_include_zero: true,
        do_not_include_null: true,
        do_not_include_undefined: true,
      });
      for (const balance of garbage) {
        assert.throws(() => {
          new Player({ name: "Claudia", balance });
        }, `Should throw exception when player's balance is ${serialize_garbage(balance)}`);
      }
    });
  });
});
