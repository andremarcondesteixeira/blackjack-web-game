import { strict as assert } from "node:assert";
import { suite, test } from "node:test";

suite("Balance", () => {
  test("The default initial balance is 0", () => {
    const balance = new Balance();
    assert.equal(balance.value, 0);
  });
});
