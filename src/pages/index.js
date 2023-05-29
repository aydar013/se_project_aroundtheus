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
import API from "../components/API.js";
import PopupWithConfirmation from "../components/popupWithConfirmation.js";

const api = new API({
  baseURL: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "5e52fc43-131f-4918-a1c8-3d415b0e6db0",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
  avatar: ".profile__image",
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",

    (cardImage, cardTitle) => {
      popupImage.openModal(cardImage, cardTitle);
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLike(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLike(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    (cardId) => {
      deleteCardPopup.openModal();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);

        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
    }
  );
  return card.getView();
}

const deleteCardPopup = new PopupWithConfirmation(".confirm-popup");
deleteCardPopup.setEventListeners();

let userId = null;

api
  .getAPIInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.getUserInfo(userData);
    userInfo.setUserAvatar(userData);
    const cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".gallery__cards"
    );
    cardSection.renderItems(userCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const editFormValidator = new FormValidator(validationSettings, editFormEl);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormEl);
addFormValidator.enableValidation();

const avatarEditModal = document.querySelector("#avatar-modal");

const editAvatarForm = document.querySelector("#avatar-modal-form");

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditModal
);
editAvatarFormValidator.enableValidation();

const popupImage = new PopupWithImage("#preview-image-modal");

const handleProfileSubmit = (inputValues) => {
  editPopup.renderLoading(true);
  api
    .updateUserInfo(inputValues)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => {
      editPopup.closeModal();
      editPopup.renderLoading(false, "Save");
    })
    .catch((err) => console.log(`Error: ${err}`));
};

const editPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileSubmit,
});

// add card

const handleCardFormSubmit = (data) => {
  cardAddPopup.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      const cardElement = renderCard(data, "#card-template");
      cardSection.addItem(cardElement);
    })
    .then(() => {
      cardAddPopup.closeModal();
      cardAddPopup.renderLoading(false);
    })
    .catch((err) => console.log(`Error: ${err}`));
};

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});

const openAvatarPopupButton = document.querySelector(".profile__image-edit");

openAvatarPopupButton.addEventListener("click", function () {
  editAvatarPopup.openModal();
  editAvatarFormValidator.setInitialState();
});

const editAvatarFormSubmitHandler = (data) => {
  editAvatarPopup.renderLoading(true);
  api
    .updateUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .then(() => {
      editAvatarPopup.closeModal();
      editAvatarPopup.renderLoading(false, "Save");
    })
    .catch((err) => console.log(`Error: ${err}`));
};

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: editAvatarFormSubmitHandler,
});

editAvatarPopup.setEventListeners();
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
