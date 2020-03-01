import GoodsListComponent from '../components/goods-list.js';
import CardController from './card.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CardsController {
  constructor(container, cardsModel, api) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._api = api;

    this._goodsListComponent = new GoodsListComponent();
    this.onFilterChange = this.onFilterChange.bind(this);
    this._cardsModel.setFilterChangeHandler(this.onFilterChange);
  }

  render() {
    const container = this._container;
    const cards = this._cardsModel.getCards();

    render(container, this._goodsListComponent, RenderPosition.BEFOREEND);
    this.renderCards(cards);
  }

  renderCards(cards) {
    const container = this._container;
    const goodsListElement = container.querySelector(`.goods__list`);
    cards.forEach((card) => {
      const cardController = new CardController(goodsListElement, this._api);
      cardController.render(card);
    });
  }

  removeCards() {
    const goodsListElement = this._goodsListComponent.getElement().querySelector(`.goods__list`);
    goodsListElement.innerHTML = ``;
  }

  update() {
    this.removeCards();
    this.renderCards(this._cardsModel.getCards());
  }

  onFilterChange() {
    this.update();
  }
}
