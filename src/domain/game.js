export class Game {
  #players;
  #amount_of_decks;

  constructor({ players, amount_of_decks }) {
    if (!players || !(players.length > 0)) {
      throw new Error("At least 1 player must play the game");
    }

    if (players.length > 7) {
      throw new Error("No more than 7 players are allowed to join");
    }

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
