import { serialize } from "../../util.js";
import { Bet } from "../bet.js";
import { Card } from "../card.js";
import { Player } from "../player.js";

export class Initial_Bets_State {
  #cards;
  #players;
  #bets;

  constructor({ cards, players, bets }) {
    if (!(cards instanceof Array)) {
      throw new Error(`Expected an array of cards. Got ${serialize(cards)} instead.`);
    }

    for (let i = 0; i < cards.length; i++) {
      if (!(cards[i] instanceof Card)) {
        throw new Error(`Invalid card in cards array at index ${i}: ${serialize(cards[i])}`);
      }
    }

    if (!(players instanceof Array)) {
      throw new Error(`Expected an array of players. Got ${serialize(players)} instead.`);
    }

    for (let i = 0; i < players.length; i++) {
      if (!(players[i] instanceof Player)) {
        throw new Error(`Invalid player in players array at index ${i}: ${serialize(players[i])}`);
      }
    }

    if (!(bets instanceof Array)) {
      throw new Error(`Expected an array of bets. Got ${serialize(bets)} instead.`);
    }

    for (let i = 0; i < bets.length; i++) {
      if (!(bets[i] instanceof Bet)) {
        throw new Error(`Invalid bet in bets array at index ${i}: ${serialize(bets[i])}`);
      }
    }

    this.#cards = Object.freeze(cards);
    this.#players = Object.freeze(players);
    this.#bets = bets;
  }

  get cards() {
    return this.#cards;
  }

  get players() {
    return this.#players;
  }

  get bets() {
    return this.#bets;
  }
}
