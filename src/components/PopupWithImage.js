import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalElement = document.querySelector(popupSelector);
    this._modalImage = this._modalElement.querySelector(
      ".modal__preview-image"
    );
    this._modalImageFooter = this._modalElement.querySelector(
      ".modal__preview-footer"
    );
  }

  openModal(name, link, alt) {
    this._modalImage.src = link;
    this._modalImage.alt = alt;
    this._modalImageFooter.textContent = name;
    super.openModal();
  }
}
