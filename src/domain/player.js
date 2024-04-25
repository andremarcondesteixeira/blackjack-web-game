export class Player {
  #name;
  #balance;

  constructor({ name, balance }) {
    this.#name = name;
    this.#balance = balance;
  }

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }
}
