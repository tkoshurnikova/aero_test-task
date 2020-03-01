export default class CardsModel {
  constructor() {
    this._cards = [];
    this.filterChangeHandler = null;
  }

  getCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  setFilter() {
    this.filterChangeHandler();
  }

  setFilterChangeHandler(handler) {
    this.filterChangeHandler = handler;
  }
}
