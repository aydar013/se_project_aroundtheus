export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleCardClick(name, link) {
    imageModal.openModal(name, link, alt);
  }

  _setEventListeners() {
    // like button
    this._likeButton = this._element.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    // delete button
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // preview image
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link, this._alt)
      );
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  getView() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `Photo of ${this._name}`;

    this._setEventListeners();

    return this._element;
  }
}
