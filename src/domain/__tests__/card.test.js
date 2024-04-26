import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { name_of, serialize } from "../../util.js";
import { Card, Faces, Suits, make_shuffled_decks } from "../card.js";
import { make_garbage } from "../../test_helpers.js";

suite(name_of(Card), () => {
  suite("Happy Path", () => {
    test(`A new ${name_of(Card)} object can be created`, () => {
      const card = new Card({
        face_name: Faces.King.name,
        suit: Suits.clubs
      });

      assert.equal(card.face_name, Faces.King.name);
      assert.equal(card.value(), 10);
      assert.equal(card.suit, Suits.clubs);
    });

    test("Ace's value is 1 if summing 11 would result in more than 21", () => {
      const ace = Faces.Ace;
      assert.equal(ace.value(16), 1);
    });

    test("Ace's value is 11 if summing 11 would result 21 or less", () => {
      const ace = Faces.Ace;
      assert.equal(ace.value(10), 11);
    });

    test("An amount of shuffled decks can be created", () => {
      assert.equal(make_shuffled_decks().length, 52);
      assert.equal(make_shuffled_decks(1).length, 52);
      assert.equal(make_shuffled_decks(2).length, 104);
      assert.equal(make_shuffled_decks(3).length, 156);
      assert.equal(make_shuffled_decks(4).length, 208);
      assert.equal(make_shuffled_decks(5).length, 260);
      assert.equal(make_shuffled_decks(6).length, 312);
      assert.equal(make_shuffled_decks(7).length, 364);
      assert.equal(make_shuffled_decks(8).length, 416);
    });
  });

  suite("Illegal states must be unrepresentable", () => {
    test("A card's suit can only be diamonds, hearts, spades, or clubs", () => {
      const garbage = make_garbage();
      for (const suit of garbage) {
        assert.throws(() => {
          new Card({
            face_name: Faces[10].name,
            suit
          });
        }, `Should throw exception when suit is ${serialize(suit)}`);
      }
    });

    test("A card's face can only be Ace, 2 to 10, Jack, Queen, Or King", () => {
      const garbage = make_garbage();
      for (const face_name of garbage) {
        assert.throws(() => {
          new Card({
            face_name,
            suit: Suits.clubs
          });
        }, `Should throw exception when face is ${serialize(face_name)}`);
      }
    });

    test("The amount of decks must be a positive integer between 1 and 8", () => {
      const garbage = make_garbage();
      for (const amount_of_decks of garbage) {
        assert.throws(() => {
          make_shuffled_decks(amount_of_decks);
        }, `Should throw exception when amount of decks is ${serialize(amount_of_decks)}`);
      }
    });
  });
});
