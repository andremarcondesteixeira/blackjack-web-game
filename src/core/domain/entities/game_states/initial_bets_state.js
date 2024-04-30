import { serialize } from "../../../../util.js";
import { Bet } from "../bet.js";
import { Card } from "../card.js";
import { Player } from "../player.js";

export class Initial_Bets_State {
  #decks;
  #players;
  #bets;

  constructor({ decks, players, bets }) {
    if (!(decks instanceof Array)) {
      throw new Error(`Expected an array of cards. Got ${serialize(decks)} instead.`);
    }

    for (let i = 0; i < decks.length; i++) {
      if (!(decks[i] instanceof Card)) {
        throw new Error(`Invalid card in cards array at index ${i}: ${serialize(decks[i])}`);
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

    this.#decks = Object.freeze(decks);
    this.#players = Object.freeze(players);
    this.#bets = Object.freeze(bets);
  }

  get decks() {
    return this.#decks;
  }

  get players() {
    return this.#players;
  }

  get bets() {
    return this.#bets;
  }

  deal_initial_cards() {
    return new Deal_Initial_Cards_State({
      decks: this.#decks,
      players: this.#players,
      bets: this.#bets,
      dealed_cards
    });
  }
}
