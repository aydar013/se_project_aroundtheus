export default class Popup {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
  }

  openModal() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this._modalElement.addEventListener("mousedown", (evt) =>
      this._handleOverlayClose(evt)
    );
  }

  closeModal() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    this._modalElement.removeEventListener("mousedown", (evt) =>
      this._handleOverlayClose(evt)
    );
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };

  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  setEventListeners() {
    this._modalElement
      .querySelector(".modal__close-button")
      .addEventListener("click", () => this.closeModal());
  }
}
