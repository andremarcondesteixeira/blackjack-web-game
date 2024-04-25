import { Lobby_State } from "./lobby_state.js";

export class Game {
  #players;
  #amount_of_decks;
  #state;

  constructor() {
    this.#players = [];
    this.#amount_of_decks = 1;
    this.#state = new Lobby_State();
    Object.seal(this.#state);
  }

  get amount_of_players() {
    return this.#players.length;
  }

  get amount_of_decks() {
    return this.#amount_of_decks;
  }

  get state() {
    return this.#state;
  }
}
