export default class Popup {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
  }

  openModal() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", (e) => this._handleEscClose(e));
    this._modalElement.addEventListener("mousedown", (e) =>
      this._handleOverlayClose(e)
    );
  }

  closeModal() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", (e) => this._handleEscClose(e));
    this._modalElement.removeEventListener("mousedown", (e) =>
      this._handleOverlayClose(e)
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
