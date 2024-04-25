import { is_an_actual_number, serialize } from "../util.js";
import { Player } from "./player.js";

const DECKS_MAX_ALLOWED_AMOUNT = 8;
const PLAYERS_MAX_ALLOWED_AMOUNT = 7;

export class Game {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    if (!(players instanceof Array)) {
      throw new Error(`Expected an array of players, but got ${serialize(players)} instead`);
    }

    if (players.length > PLAYERS_MAX_ALLOWED_AMOUNT) {
      throw new Error(`No more than ${PLAYERS_MAX_ALLOWED_AMOUNT} player can join the game, but tried to play with ${players.length} players`);
    }

    for (let i = 0; i < players.length; i++) {
      if (!(players[i] instanceof Player)) {
        throw new Error(`Invalid player at index ${i}: ${serialize(players[i])}`);
      }
    }

    if (!is_an_actual_number(amount_of_decks) || amount_of_decks <= 0) {
      throw new Error(`Amount of decks must be a positive integer greather than zero, but got ${serialize(amount_of_decks)} instead`);
    }

    if (amount_of_decks > DECKS_MAX_ALLOWED_AMOUNT) {
      throw new Error(`Maximum allowed amount of decks is ${DECKS_MAX_ALLOWED_AMOUNT}, but got ${amount_of_decks} instead`);
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
