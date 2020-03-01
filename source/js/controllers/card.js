import CardComponent from '../components/card.js';
import API from '../api.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CardController {
  constructor(container, api) {
    this._container = container;
    this._api = api;
    this._cardComponent = null;
    this._card = null;
  }

  render(card) {
    this._card = card;

    this._cardComponent = new CardComponent(this._card);
    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    this.setCardListeners();
  }

  setCardListeners() {
    this._cardComponent.setFavButtonClickHandler(() => {
      this._api.updateCard(this._card.id)
        .then((response) => {
          if (response.status === `FAVORITE_SUCCESS`) {
            this._card.inFav = response.data.inFav;
            this._cardComponent.rerender();
          } else {
            console.log(response.data.message);
          }
        })
    })
  }
}
