import { is_an_actual_positive_integer, serialize } from "../../../util.js";
import { Balance } from "./balance.js";

export class Player {
  #id;
  #name;
  #balance;

  constructor({ id, name, balance }) {
    if (typeof name !== "string" || !(name.trim().length > 0)) {
      throw new Error(`The player's name must be a non-empty string. Got ${serialize(name)} instead.`);
    }

    if (!is_an_actual_positive_integer(id)) {
      throw new Error(`The ID must be a positive integer. Got ${serialize(id)} instead.`);
    }

    this.#id = id;
    this.#name = name;
    this.#balance = new Balance(balance);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }
  get balance() {
    return this.#balance;
  }
}
