import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__submit-button");
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Loading...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirm();
    });
  }
}
