export class Game {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    this.#players = players;
    this.#amount_of_decks = amount_of_decks;
  }

  get players() {
    return this.#players;
  }

  get amount_of_decks() {
    return this.#amount_of_decks;
  }
}
