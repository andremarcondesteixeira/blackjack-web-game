export class Balance {
  #value;

  constructor(initial_balance = 0) {
    this.#value = initial_balance;
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
