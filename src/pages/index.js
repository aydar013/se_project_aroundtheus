import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Section from "../components/Section.js";

const initialCards = [
  {
    name: "Miami, FL",
    link: "https://media.istockphoto.com/id/802893644/photo/aerial-view-of-downtown-miami-florida.jpg?s=612x612&w=0&k=20&c=QwdSYtoeB-9xTvqgbpnM9aCaRf_39rw8bVw7LsszSGg=",
  },
  {
    name: "New York, NY",
    link: "https://media.istockphoto.com/id/1277102943/photo/taxis-in-times-square-with-7th-avenue-new-york-city-manhattan.jpg?s=612x612&w=0&k=20&c=MYSShgQK5XOq4EunHxv91ArQMRTwMOqGndFBmcQdHa0=",
  },
  {
    name: "Washington, DC",
    link: "https://media.istockphoto.com/id/975466384/photo/the-united-states-capitol-building-dc.jpg?s=612x612&w=0&k=20&c=GqkrTFfT1Kttytd13mBR1FZkxJEBqazyUr6MWSKjXOg=",
  },
  {
    name: "Chicago, IL",
    link: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2Fnb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Seattle, WA",
    link: "https://images.unsplash.com/photo-1542223616-9de9adb5e3e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlYXR0bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Los Angeles, CA",
    link: "https://media.istockphoto.com/id/636018116/photo/aerial-view-of-the-hollywood-sign-at-dusk.jpg?s=612x612&w=0&k=20&c=G8k7oJrVAho6u1rZiKOAcyrhIGbt71gA7NlmhXJfpl8=",
  },
];

//// VARIABLES

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileForm = profileEditModal.querySelector(".modal__form");
const cardAddModal = document.querySelector("#card-add-modal");
const addForm = document.querySelector(".add-form");
const previewModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewFooter = document.querySelector(".modal__preview-footer");
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

const placesList = document.querySelector(".gallery__cards");

const cardSelector = "#card-template";

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error-visible",
};

// edit profile

const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
});

const editFormEl = profileEditModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(validationSettings, editFormEl);
editFormValidator.enableValidation();

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editPopup.closeModal();
}

const editPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileSubmit,
});

// add card

const addFormEl = cardAddModal.querySelector(".modal__form");
const addFormValidator = new FormValidator(validationSettings, addFormEl);
addFormValidator.enableValidation();

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});

function handleCardFormSubmit(data) {
  const cardElement = renderCard(data, "#card-template");
  cardSection.addItem(cardElement);
  cardAddPopup.closeModal();
  console.log(cardElement);
}

// picture preview

const popupImage = new PopupWithImage("#preview-image-modal");

function handleImageClick(cardImage, cardTitle) {
  popupImage.openModal(cardImage, cardTitle);
}

function renderCard(data, cardSelector) {
  const card = new Card(data, cardSelector, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item, "#card-template");
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

/////////////
/// EVENT HANDLERS
/////////////

cardAddPopup.setEventListeners();
editPopup.setEventListeners();
popupImage.setEventListeners();

addProfileButton.addEventListener("click", function () {
  cardAddPopup.openModal();
  addFormValidator.setInitialState();
});

editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.description;

  editPopup.openModal();

  editFormValidator.setInitialState();
});
// load initial cards

cardSection.renderItems();
