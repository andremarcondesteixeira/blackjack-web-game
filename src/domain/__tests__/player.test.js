import { Player } from "../player.js";
import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { garbage, serialize_garbage } from "./helpers.js";

suite("Player", () => {
  test("A new Player object can be created", () => {
    const player = new Player({ name: "Robert", balance: 5200 });
    assert.equal(player.name, "Robert");
    assert.equal(player.balance, 5200);
  });

  suite("Illegal states are unrepresentable", () => {
    test("A player must have a name", () => {
      for (const name of garbage) {
        assert.throws(() => {
          new Player({ name, balance: 100 });
        }, `Should throw exception when player name is ${serialize_garbage(name)}`);
      }
    });
  });
});
