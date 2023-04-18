import {
  openModal,
  previewFooter,
  previewModal,
  previewImage,
} from "./Utils.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // .card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // .card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    // .card__image
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handlePreviewImage();
      });
  }

  getCardElement() {
    this._cardElement = this._getView();
    this._setEventListeners();

    this._cardElement.querySelector(".card__image").cardImage.src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove;
    this._cardElement = null;
  }

  _handlePreviewImage() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewFooter.textContent = this._name;

    openModal(previewModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
  }
}
