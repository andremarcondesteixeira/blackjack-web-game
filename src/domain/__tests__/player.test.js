import { Player } from "../player.js";
import { strict as assert } from "node:assert";
import { suite, test } from "node:test";

suite("Player", () => {
  test("A new Player object can be created", () => {
    const player = new Player({ name: "Robert", balance: 5200 });
    assert.equal(player.name, "Robert");
    assert.equal(player.balance, 5200);
  });
});
