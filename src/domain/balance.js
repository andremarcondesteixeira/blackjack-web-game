export class Balance {
  #value;

  constructor() {
    this.#value = 0;
  }

  get value() {
    return this.#value;
  }
}
