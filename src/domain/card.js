import { DECKS_MAX_ALLOWED_AMOUNT } from "../constants.js";
import { serialize } from "../util.js";

export const Suits = Object.freeze({
  diamonds: "diamonds",
  clubs: "clubs",
  hearts: "hearts",
  spades: "spades"
});

export const Faces = Object.freeze({
  Ace: Object.freeze({
    name: "Ace",
    value: sum => sum + 11 > 21 ? 1 : 11,
  }),
  2: Object.freeze({
    name: "2",
    value: () => 2,
  }),
  3: Object.freeze({
    name: "3",
    value: () => 3,
  }),
  4: Object.freeze({
    name: "4",
    value: () => 4,
  }),
  5: Object.freeze({
    name: "5",
    value: () => 5,
  }),
  6: Object.freeze({
    name: "6",
    value: () => 6,
  }),
  7: Object.freeze({
    name: "7",
    value: () => 7,
  }),
  8: Object.freeze({
    name: "8",
    value: () => 8,
  }),
  9: Object.freeze({
    name: "9",
    value: () => 9,
  }),
  10: Object.freeze({
    name: "10",
    value: () => 10,
  }),
  Jack: Object.freeze({
    name: "Jack",
    value: () => 10,
  }),
  Queen: Object.freeze({
    name: "Queen",
    value: () => 10,
  }),
  King: Object.freeze({
    name: "King",
    value: () => 10,
  }),
});

export class Card {
  #face;
  #suit;

  constructor({ face_name, suit }) {
    if (!Object.keys(Suits).includes(suit)) {
      throw new Error(`A card's suit can only be diamonds, clubs, hearts, or spades. Got ${serialize(suit)} instead.`);
    }

    if (!Object.keys(Faces).includes(face_name)) {
      throw new Error(`A card's face can only be Ace, 2 to 10, Jack, Queen, or King. Got ${serialize(face_name)} instead.`);
    }

    this.#face = Faces[face_name];
    this.#suit = suit;
  }

  get face_name() {
    return this.#face.name;
  }

  get suit() {
    return this.#suit;
  }

  value(sum) {
    return this.#face.value(sum);
  }
}

export function make_shuffled_decks(amount_of_decks) {
  if (!Number.isInteger(amount_of_decks) || amount_of_decks < 1 || amount_of_decks > DECKS_MAX_ALLOWED_AMOUNT) {
    throw new Error(`The amount of decks must be an integer between 1 and ${DECKS_MAX_ALLOWED_AMOUNT}. Got ${serialize(amount_of_decks)} instead.`);
  }

  const cards = [];

  for (let i = 0; i < amount_of_decks; i++) {
    for (const face_name of Object.keys(Faces)) {
      for (const suit of Object.keys(Suits)) {
        cards.push(new Card({
          face_name,
          suit
        }));
      }
    }
  }

  shuffle(cards);

  return Object.freeze(cards);
}

function shuffle(arr) {
  let current_index = arr.length;
  while (current_index) {
    const random_index = Math.floor(Math.random() * current_index--);
    const original = arr[current_index];
    arr[current_index] = arr[random_index];
    arr[random_index] = original;
  }
}
