import Card from './models/card.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  PATCH: `PATCH`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  getCards() {
    return this._load({url: `PRODUCTS_SUCCESS`})
      .then((response) => response.json())
      .then(Card.parseCards);
  }

  updateCard(id) {
    return this._load({
      url: `FAVORITE_SUCCESS`,
      method: Method.PATCH,
      body: JSON.stringify({'productID': id}),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  updateCardsList(filters) {
    return this._load({
      url: `FILTER_SUCCESS`,
      method: Method.PATCH,
      body: JSON.stringify({'filters': filters}),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json())
  }
};
