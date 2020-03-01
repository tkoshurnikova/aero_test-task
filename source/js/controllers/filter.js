import FilterComponent from '../components/filter.js';
import API from '../api.js';
import Card from '../models/card.js';
import {render, RenderPosition} from '../utils/render.js';

export default class FilterController {
  constructor(container, cardsModel, api) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._api = api;
    this._filterComponent = null;
  }

  render() {
    this._filterComponent = new FilterComponent();
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    this.setSubmitListener()
  }

  setSubmitListener() {
    this._filterComponent.setSubmitButtonHandler((evt) => {
      evt.preventDefault();

      const checkedFilters = Array.from(this._filterComponent.getElement().querySelectorAll(`.filter-form__checkbox-input`))
        .filter((input) => input.checked)
        .map((input) => input.name)

      this._api.updateCardsList(checkedFilters)
        .then((response) => {
          if (response.status === `FILTER_SUCCESS`) {
            this._cardsModel.setCards(Card.parseCards(response))
            this._cardsModel.setFilter();
          } else {
            console.log(response.data.message);
          }
        })
    })
  }
}
