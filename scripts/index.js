const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//// PROFILE

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

//// MODALS

const modal = document.querySelector(".modal");
const profileContainer = document.querySelector(".modal__container");
const profileForm = document.querySelector(".modal__form");
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardAddModal = document.querySelector("#card-add-modal");
const addForm = document.querySelector(".add-form");

const previewModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");

const previewFooter = document.querySelector(".modal__preview-footer");

//// INPUTS AND BUTTONS

const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const profileEditCloseBtn = profileEditModal.querySelector(
  ".modal__close-button"
);
const cardAddCloseBtn = cardAddModal.querySelector(".modal__close-button");
const previewCloseModalBtn = previewModal.querySelector(
  "#preview-close-button"
);

const inputName = document.querySelector("#profile-title-input");
const inputDescription = document.querySelector("#profile-description-input");

const cardTitleInput = addForm.querySelector("#card-title-input");
const cardURLInput = addForm.querySelector("#card-url-input");

//// WRAPPERS
const placesList = document.querySelector(".gallery__cards");

/////////////
/// FUNCTIONS
/////////////

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteButton.classList.toggle("card__delete-button");
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewFooter.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function renderCard(data, wrapper) {
  wrapper.append(getCardElement(data));
}

/////////////
/// EVENT HANDLERS
/////////////

editProfileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addProfileButton.addEventListener("click", () => openModal(cardAddModal));

profileEditCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

cardAddCloseBtn.addEventListener("click", () => closeModal(cardAddModal));

previewCloseModalBtn.addEventListener("click", () => closeModal(previewModal));

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(profileEditModal);
});

initialCards.forEach((data) => renderCard(data, placesList));

function renderCard(data, placesList) {
  const newElement = getCardElement(data);
  placesList.prepend(newElement);
}

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, placesList);
  closeModal(cardAddModal);
});
