export class Player {
  #name;
  #balance;

  constructor({ name, balance }) {
    if (typeof name !== "string" || !(name.trim().length > 0)) {
      throw new Error("Invalid name");
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
