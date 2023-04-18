class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  // _disableButton() {
  //   this._submitButton.classList.add(this._inactiveButtonClass);
  //   this._submitButton.disabled = true;
  // }

  // _enableButton() {
  //   this._submitButton.classList.remove(this._inactiveButtonClass);
  //   this._submitButton.disabled = false;
  // }

  // toggleButtonState() {
  //   if (this._hasInvalidInput()) {
  //     this._disableButton();
  //   } else {
  //     this._enableButton();
  //   }
  // }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    // const { inputSelector } = options;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    // this._formEls = [...document.querySelectorAll(options.formSelector)];
    // this._formEls.forEach((formEl) => {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();

      // this._formEl.addEventListener("reset", () => {
      //   this._disableButton();
      // });
    });
    this._setEventListeners();
  }
}

export default FormValidator;

// _setEventListeners() {
//   const { inputSelector } = options;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(options.submitButtonSelector);
//   toggleButtonState(inputEls, submitButton, options.inactiveButtonClass);
//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (e) => {
//       checkInputValidity(formEl, inputEl, options);
//       toggleButtonState(inputEls, submitButton, options.inactiveButtonClass);
//     });

//     formEl.addEventListener("reset", () => {
//       disableButton(submitButton, options.inactiveButtonClass);
//     });
//   });
//   }

//   enableValidation() {
//     this._formaddEventListener("submit", (e) => {
//       e.preventDefault();
//     });
//     setEventListeners(formEl, options);
//   });
//   }
// }

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__submit-button",
//   inactiveButtonClass: "modal__submit-button_disabled",
//   inputErrorClass: "modal__form-input_error",
//   errorClass: "modal__error-visible",
// }

// const editFormValidator = new FormValidator();
// const addFormValidator = new FormValidator();
