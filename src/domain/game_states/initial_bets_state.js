export class Initial_Bets_State {
  #cards;
  #players;

  constructor({ cards, players }) {
    this.#cards = Object.freeze(cards);
    this.#players = Object.freeze(players);
  }

  get cards() {
    return this.#cards;
  }

  get players() {
    return this.#players;
  }
}