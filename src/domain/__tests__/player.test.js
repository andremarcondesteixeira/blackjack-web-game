import { Player } from "../player.js";
import { strict as assert } from "node:assert";
import { suite, test } from "node:test";

suite("Player", () => {
  test("A new Player object can be created", () => {
    const player = new Player({ name: "Robert", balance: 5200 });
    assert.equal(player.name, "Robert");
    assert.equal(player.balance, 5200);
  });

  suite("Illegal states are unrepresentable", () => {
    test("A player must have a name", () => {
      for (const name of [null, undefined, "", "    ", {}, [], Date.now(), () => {}, 0, NaN]) {
        assert.throws(() => {
          new Player({ name, balance: 100 });
        }, `Should throw exception when player name is ${JSON.stringify(name)}`);
      }
    });
  });
});
