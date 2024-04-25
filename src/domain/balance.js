export class Balance {
  #value;

  constructor(initial_balance = 0) {
    this.#value = initial_balance;
  }

  get value() {
    return this.#value;
  }
}
