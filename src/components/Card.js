export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // like button

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    // delete button

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    // preview image
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link, this._alt);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._cardLikes.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  getView() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    cardImage.src = this._link;
    cardTitle.textContent = this._name;
    cardImage.alt = `Photo of ${this._name}`;

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardLikes = this._element.querySelector(".card__like-counter");
    this.renderLikes();

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }
}
