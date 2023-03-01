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

//// INPUTS AND BUTTONS

const editProfileButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const inputName = document.querySelector("#profile-title-input");
const inputDescription = document.querySelector("#profile-description-input");

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

closeButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(profileEditModal);
});

initialCards.forEach((data) => renderCard(data, placesList));
