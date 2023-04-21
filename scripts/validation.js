function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options.inactiveButtonClass);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options.inactiveButtonClass);
    });

    formEl.addEventListener("reset", () => {
      disableButton(submitButton, options.inactiveButtonClass);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error-visible",
});

// enableValidation(config);

// class FormValidator {
//   constructor(settings, formElement) {
//     this._inputSelector = settings.inputSelector;
//     this._submitButtonSelector = settings.submitButtonSelector;
//     this._inactiveButtonClass = settings.inactiveButtonClass;
//     this._inputErrorClass = settings.inputErrorClass;
//     this._errorClass = settings.errorClass;

//     this._form = formElement;
//   }

//   _checkInputValidity(inputEl) {
//     if (!inputEl.validity.valid) {
//       this._showInputError(inputEl);
//     } else {
//       this._hideInputError(inputEl);
//     }
//   }

//   _showInputError(inputEl) {
//     const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
//     inputEl.classList.add(this._inputErrorClass);
//     errorMessageEl.textContent = inputEl.validationMessage;
//     errorMessageEl.classList.add(this._errorClass);
//   }

//   _hideInputError(inputEl) {
//     const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
//     inputEl.classList.remove(this._inputErrorClass);
//     errorMessageEl.textContent = "";
//     errorMessageEl.classList.remove(this._errorClass);
//   }

//   _disableButton() {
//     this._submitButton.classList.add(this._inactiveButtonClass);
//     this._submitButton.disabled = true;
//   }

//   _enableButton() {
//     this._submitButton.classList.remove(this._inactiveButtonClass);
//     this._submitButton.disabled = false;
//   }

//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this._disableButton();
//     } else {
//       this._enableButton();
//     }
//   }

//   _hasInvalidInput() {
//     this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
//     return !this._inputEls.every((inputEl) => inputEl.validity.valid);
//   }

//   _setEventListeners() {
//     // const { inputSelector } = options;
//     this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
//     this._submitButton = this._form.querySelector(this._submitButtonSelector);

//     this._toggleButtonState();
//     this._inputEls.forEach((inputEl) => {
//       inputEl.addEventListener("input", (e) => {
//         this._checkInputValidity(inputEl);
//         this._toggleButtonState();
//       });
//     });
//   }

//   enableValidation() {
//     this._form.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });
//     this._setEventListeners();
//   }
// }

// export default FormValidator;