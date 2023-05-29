export default class API {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getAPIInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    }).then(this._handleResponse);
  }

  updateUserAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }

  addCardLike(cardId) {
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        cardId,
      }),
    }).then(this._handleResponse);
  }

  removeCardLike(cardId) {
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        cardId,
      }),
    }).then(this._handleResponse);
  }
}
