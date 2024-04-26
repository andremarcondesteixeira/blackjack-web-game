import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { serialize } from "../../util.js";
import { Balance } from "../balance.js";
import { make_garbage } from "./test_helpers.js";

suite("Balance", () => {
  suite("Happy path", () => {
    test("The default initial balance is 0", () => {
      const balance = new Balance();
      assert.equal(balance.value, 0);
    });

    test("An initial balance can be specified", () => {
      const balance = new Balance(1000);
      assert.equal(balance.value, 1000);
    });

    test("The initial balance will always be a rounded down integer", () => {
      const balance = new Balance(230.99);
      assert.equal(balance.value, 230);
    });

    test("A balance can get a deposit to increase its value", () => {
      const balance = new Balance();
      balance.deposit(50);
      assert.equal(balance.value, 50);
      balance.deposit(1000);
      assert.equal(balance.value, 1050);
    });

    test("A balance can get a deposit to increase its value when initialized with custom initial value", () => {
      const balance = new Balance(5000);
      balance.deposit(500);
      assert.equal(balance.value, 5500);
      balance.deposit(100);
      assert.equal(balance.value, 5600);
    });

    test("A balance can be withdrawn to decrease its value", () => {
      const balance = new Balance();
      balance.deposit(1200);
      balance.withdraw(350);
      assert.equal(balance.value, 850);
      balance.withdraw(850);
      assert.equal(balance.value, 0);
    });

    test("A balance can be withdrawn to decrease its value when initialized with custom initial value", () => {
      let balance = new Balance(100);
      balance.withdraw(100);
      assert.equal(balance.value, 0);

      balance = new Balance(1000);
      balance.withdraw(600);
      assert.equal(balance.value, 400);
      balance.withdraw(400);
      assert.equal(balance.value, 0);
    });
  });

  suite("Validation", () => {
    test("The custom initial balance must be a number greater than or equal to 0", () => {
      const garbage = make_garbage({
        do_not_include_positive_numbers_except_zero: true,
        do_not_include_zero: true,
        do_not_include_undefined: true,
        do_not_include_null: true,
      });
      for (let initial_balance of garbage) {
        assert.throws(() => {
          new Balance(initial_balance);
        }, `Should throw an exception when the initial balance is ${serialize(initial_balance)}`);
      }
    });

    test("Withdrawing a value greater than the balance's value is not allowed", () => {
      assert.throws(() => new Balance().withdraw(100)); // 0 -> -100
      assert.throws(() => new Balance(1000).withdraw(2000)); // 1000 -> -1000
    });
  });
});
