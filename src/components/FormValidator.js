export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this.toggleButtonState();
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  setInitialState() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
      this.toggleButtonState();
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
