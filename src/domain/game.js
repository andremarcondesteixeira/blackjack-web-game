export class Game {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    if (!(players instanceof Array)) {
      players.name;
      throw new Error(`Expected an array of players, but got ${typeof players} instead`);
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
