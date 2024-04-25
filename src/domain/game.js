import { is_an_actual_number, serialize } from "../util.js";
import { Player } from "./player.js";

export class Game {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    if (!(players instanceof Array)) {
      throw new Error(`Expected an array of players, but got ${typeof players} instead`);
    }

    if (players.length > 7) {
      throw new Error("No more than 7 player can join the game");
    }

    for (let i = 0; i < players.length; i++) {
      if (!(players[i] instanceof Player)) {
        throw new Error(`Invalid player at players[${i}]`);
      }
    }

    if (!is_an_actual_number(amount_of_decks) || amount_of_decks <= 0) {
      throw new Error(`Amount of decks must be a positive integer greather than zero, but got ${serialize(amount_of_decks)} instead`);
    }

    this.#players = Object.freeze(players);
    this.#amount_of_decks = amount_of_decks;
  }

  get players() {
    return this.#players;
  }

  get amount_of_decks() {
    return this.#amount_of_decks;
  }
}
