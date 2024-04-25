export class Balance {
  #value;

  constructor(initial_balance = 0) {
    if (Balance.#initial_balance_is_invalid(initial_balance)) {
      throw new Error("The initial balance must be a number greater than or equal to 0");
    }

    this.#value = Math.floor(initial_balance);
  }

  static #initial_balance_is_invalid(initial_balance) {
    return (
      typeof initial_balance !== "number"
      || initial_balance < 0
      || Number.isNaN(initial_balance)
      || !Number.isFinite(initial_balance)
    );
  }

  get value() {
    return this.#value;
  }

  deposit(amount) {
    this.#value += amount;
  }

  withdraw(amount) {
    this.#value -= amount;
  }
}
