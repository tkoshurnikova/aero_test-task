import AbstractComponent from './abstract-component.js';

const createGoodsListTemplate = () => {
  return (
    `<section class="page-main__goods goods">
      <h2 class="visually-hidden">Каталог</h2>
      <ul class="goods__list">
      </ul>
    </section>`
  );
};

export default class GoodsList extends AbstractComponent {
  getTemplate() {
    return createGoodsListTemplate();
  }
}
