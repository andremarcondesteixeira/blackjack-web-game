export class Player {
  #name;
  #balance;

  constructor({ name, balance }) {
    if (typeof name !== "string" || !(name.trim().length > 0)) {
      throw new Error("Invalid name");
    }

    if (typeof balance !== "number" || balance < 0) {
      throw new Error("Balance must be a number greater than 0");
    }

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
