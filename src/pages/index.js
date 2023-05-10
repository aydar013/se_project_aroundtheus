import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  editProfileButton,
  addProfileButton,
  inputName,
  inputDescription,
  validationSettings,
  editFormEl,
  addFormEl,
} from "../utils/constants.js";

// edit profile

const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
});

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
  console.log(cardSection);
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
