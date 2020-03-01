import API from './api.js';
import CardsModel from './models/cards.js';
import CardsController from './controllers/cards.js';
import FilterController from './controllers/filter.js';
import {render, RenderPosition} from './utils/render.js';

const END_POINT = `https://my-json-server.typicode.com/aero-frontend/test-task`;
const api = new API(END_POINT);
const cardsModel = new CardsModel();

const siteMainElement = document.querySelector(`main`);
const cardsController = new CardsController(siteMainElement, cardsModel, api);
const filterController = new FilterController(siteMainElement, cardsModel, api);

api.getCards()
  .then((cards) => {
    cardsModel.setCards(cards);
    cardsController.render();
    filterController.render();
  });
