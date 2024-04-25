export class Lobby_State {
  #add_player_to_seat;
  #remove_player_on_seat;
  #set_amount_of_decks;

  constructor({ add_player_to_seat, remove_player_on_seat, set_amount_of_decks }) {
    this.#add_player_to_seat = add_player_to_seat;
    this.#remove_player_on_seat = remove_player_on_seat;
    this.#set_amount_of_decks = set_amount_of_decks;
  }

  add_player_to_seat(player, seat_number) {
    this.#add_player_to_seat(player, seat_number);
  }

  remove_player_on_seat(index) {
    this.#remove_player_on_seat(index);
  }

  set_amount_of_decks(amount) {
    this.#set_amount_of_decks(amount);
  }
}
