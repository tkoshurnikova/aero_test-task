import AbstractComponent from './abstract-component.js';

const BRANDS_LIST = [
  `Canon`,
  `Olympus`,
  `Fujifilm`,
  `Pentax`,
  `Nikon`,
  `Sigma`,
  `Panasonic`,
  `General Electrics`,
  `Leica`,
  `Zenit`
];

const createBrandsListMarkup = (brands) => {
  return brands.map((brand) => {
    return (
      `<li>
        <input class="filter-form__checkbox-input visually-hidden" type="checkbox" name="${brand.toLowerCase()}" id="filter-${brand.toLowerCase()}">
        <label class="filter-form__label filter-form__label--checkbox" for="filter-${brand.toLowerCase()}">${brand}</label>
      </li>`
    );
  })
  .join(`\n`);
};

const createFilterTemplate = () => {
  const brandsMarkup = createBrandsListMarkup(BRANDS_LIST);

  return (
    `<section class="page-main__filters filters">
      <form class="filters__form filter-form" action="#" method="post">
        <button class="filter-form__button filter-form__button--submit" type="submit">Показать результат</button>
        <button class="filter-form__button filter-form__button--reset" type="reset">Очистить фильтр</button>
        <fieldset class="filter-form__fieldset">
          <legend class="filter-form__legend">Производитель</legend>
          <ul class="filter-form__brands-list">
            ${brandsMarkup}
          </ul>
        </fieldset>
      </form>
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor() {
    super();
    this.setSubmitButtonHandler();
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setSubmitButtonHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
