import { DECKS_MAX_ALLOWED_AMOUNT, PLAYERS_MAX_ALLOWED_AMOUNT } from "../../constants.js";
import { is_an_actual_number, serialize } from "../../util.js";
import { make_shuffled_decks } from "../card.js";
import { Player } from "../player.js";
import { Initial_Bets_State } from "./initial_bets_state.js";

export class Game_Beginning_State {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    if (!(players instanceof Array)) {
      throw new Error(`Expected an array of players. Got ${serialize(players)} instead.`);
    }

    if (players.length > PLAYERS_MAX_ALLOWED_AMOUNT) {
      throw new Error(`A maximum of ${PLAYERS_MAX_ALLOWED_AMOUNT} players are allowed. Got ${players.length} instead.`);
    }

    for (let i = 0; i < players.length; i++) {
      if (!(players[i] instanceof Player)) {
        throw new Error(`Invalid player at index ${i}: ${serialize(players[i])}`);
      }
    }

    if (!is_an_actual_number(amount_of_decks)) {
      throw new Error(`Amount of decks must be a number. Got ${serialize(amount_of_decks)} instead.`);
    }

    if (!Number.isInteger(amount_of_decks) || amount_of_decks <= 0) {
      throw new Error(`Amount of decks must be a positive integer greather than zero. Got ${amount_of_decks} instead.`);
    }

    if (amount_of_decks > DECKS_MAX_ALLOWED_AMOUNT) {
      throw new Error(`A maximum of ${DECKS_MAX_ALLOWED_AMOUNT} are allowed. Got ${amount_of_decks} instead.`);
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

  begin_game() {
    return new Initial_Bets_State({
      players: this.#players,
      cards: make_shuffled_decks(this.#amount_of_decks)
    });
  }
}
