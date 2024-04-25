import { Lobby_State } from "./lobby_state.js";

export class Game {
  #players;
  #amount_of_decks;
  #state;

  constructor() {
    this.#players = new Array(7).fill(null);
    this.#amount_of_decks = 1;
    this.#state = new Lobby_State({
      add_player_to_seat: (player, seat_number) => this.#players[seat_number - 1] = player,
      remove_player_on_seat: seat_number => this.#players[seat_number - 1] = null,
      set_amount_of_decks: amount => this.#amount_of_decks = amount,
    });
    Object.seal(this.#state);
  }

  get amount_of_players() {
    return this.#players.filter(p => !!p).length;
  }

  get amount_of_decks() {
    return this.#amount_of_decks;
  }

  get state() {
    return this.#state;
  }
}
