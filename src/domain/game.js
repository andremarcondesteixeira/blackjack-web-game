export class Game {
  #players;
  #amount_of_decks;

  constructor() {
    this.#players = [];
    this.#amount_of_decks = 1;
  }

  get amount_of_players() {
    return this.#players.length;
  }

  get amount_of_decks() {
    return this.#amount_of_decks;
  }
}
