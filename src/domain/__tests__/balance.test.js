import { strict as assert } from "node:assert";
import { beforeEach, suite, test } from "node:test";
import { Balance } from "../balance.js";

suite("Balance", () => {
  suite("Happy path", () => {
    let balance;

    beforeEach(() => {
      balance = new Balance();
    });

    test("The default initial balance is 0", () => {
      const balance = new Balance();
      assert.equal(balance.value, 0);
    });

    test("An initial balance can be specified", () => {
      const balance = new Balance(1000);
      assert.equal(balance.value, 1000);
    });

    test("A balance can get a deposit to increase its value", () => {
      balance.deposit(500);
      assert.equal(balance.value, 500);
    });

    test("A balance can be withdrawn to decrease its value", () => {
      const balance = new Balance(1200);
      balance.withdraw(350);
      assert.equal(balance.value, 850);
    });
  });
});
