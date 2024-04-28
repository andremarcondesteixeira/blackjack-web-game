import { is_an_actual_positive_integer, serialize } from "../util.js";

export class Bet {
  #player_id;
  #value;

  constructor({ player_id, value }) {
    if (!is_an_actual_positive_integer(player_id)) {
      throw new Error(`The player ID must be a positive integer. Got ${serialize(player_id)} instead.`);
    }

    if (!is_an_actual_positive_integer(value)) {
      throw new Error(`The value must be a positive integer. Got ${serialize(value)} instead.`);
    }

    this.#player_id = player_id;
    this.#value = value;
  }

  get player_id() {
    return this.#player_id;
  }

  get value() {
    return this.#value;
  }
}
