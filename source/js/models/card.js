export default class Card {
  constructor(data) {
    this.id = data[`id`];
    this.link = data[`link`];
    this.code = data[`code`];
    this.imgUrl = data[`imgUrl`];
    this.availability = data[`availability`];
    this.title = data[`title`];
    this.params = data[`params`];
    this.inFav = data[`inFav`];
    this.inComparsion = data[`inComparsion`];
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.data.products.map(Card.parseCard);
  }
}
