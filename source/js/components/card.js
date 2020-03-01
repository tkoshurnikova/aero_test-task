import AbstractComponent from './abstract-component.js';

const createParamsMarkup = (params) => {
  return params.map(({name, value}) => {
    return (
      `<p><em>${name}</em> ${value}</p>`
    );
  })
  .join(`\n`);
};

const createCardTemplate = (card) => {
  const {link, code, imgUrl, availability, title, params, inFav} = card;
  const paramsMarkup  = createParamsMarkup(params);

  return (
    `<li class="goods__card card">
      <div class="card__info">
        <span class="card__stars-wrapper">
          <span class="card__stars"></span><span class="card__stars card__stars--active"></span>
        </span>
        <p class="card__sku-code">Арт. ${code}</p>
      </div>
      <p class="card__image-wrapper">
        <img class="card__image" src="css/assets/image.jpg" width="195" height="145" alt="${title}">
      </p>
      <p class="card__availablity ${(availability) ? `card__availablity--true` : `card__availablity--false`}">${(availability) ? `В наличии` : `Нет в наличии`}</p>
      <h3 class="card__heading"><a href="${link}">${title}</a></h2>
      <section class="card__details">
        <h4 class="visually-hidden">Подробная информация о товаре</h4>
        ${paramsMarkup}
      </section>
      <p class="card__price">49 999 руб.</p>
      <p class="card__bonuses">+490 бонусов</p>
      <div class="card__buttons-wrapper">
        <button class="card__buy-button" type="button">Купить</button>
        <button class="card__button card__button--favourite ${(inFav) ? `card__button--favourite-active` : ``}" type="button">
          <span class="visually-hidden">Добавить в избранное</span>
        </button>
        <button class="card__button card__button--compare" type="button">
          <span class="visually-hidden">Добавить к сравнению</span>
        </button>
      </div>
    </li>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this.setFavButtonClickHandler();
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
  }

  setFavButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__button--favourite`).addEventListener(`click`, handler);
  }
}
