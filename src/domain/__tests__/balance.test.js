import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { Balance } from "../balance.js";

suite("Balance", () => {
  test("The default initial balance is 0", () => {
    const balance = new Balance();
    assert.equal(balance.value, 0);
  });

  test("An initial balance can be specified", () => {
    const balance = new Balance(1000);
    assert.equal(balance.value, 1000);
  });
});
