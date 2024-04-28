import { is_an_actual_integer } from "../util.js";

export class Balance {
  #value;

  constructor(initial_balance) {
    if (is_an_actual_integer(initial_balance) || initial_balance < 0) {
      throw new Error("The initial balance must be a number greater than or equal to 0");
    }

    this.#value = Math.floor(initial_balance);
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
