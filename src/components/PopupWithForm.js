import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    // console.log(this._modalForm);
    this._handleFormSubmit = handleFormSubmit;
    // console.log(this._handleFormSubmit);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs = this._modalForm.querySelectorAll(".modal__form-input");

    this._inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;
      inpinputValues[name] = value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  openModal() {
    super.openModal();
  }

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }
}
