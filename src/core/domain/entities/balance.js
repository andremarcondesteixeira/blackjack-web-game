import { is_an_actual_integer, serialize } from "../../../util.js";

export class Balance {
  #value;

  constructor(balance) {
    if (!is_an_actual_integer(balance) || balance < 0) {
      throw new Error(`The balance must be a positive integer greater than or equal to 0. Got ${serialize(balance)} instead.`);
    }

    this.#value = balance;
  }

  get value() {
    return this.#value;
  }

  deposit(amount) {
    this.#value += amount;
  }

  withdraw(amount) {
    if (amount > this.#value) {
      throw new Error(`The balance cannot be negative. Tried to withdraw ${amount} when the balance was ${this.#value}`);
    }

    this.#value -= amount;
  }
}
