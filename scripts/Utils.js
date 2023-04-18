export const previewModal = document.querySelector("#preview-image-modal");
export const previewImage = document.querySelector(".modal__preview-image");
export const previewFooter = document.querySelector(".modal__preview-footer");

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalWithEscButton);
  modal.removeEventListener("mousedown", closeModalWithOverlayClick);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalWithEscButton);
  modal.addEventListener("mousedown", closeModalWithOverlayClick);
}

export function closeModalWithEscButton(e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

export function closeModalWithOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}
