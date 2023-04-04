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

//// PROFILE

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

//// MODALS

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileForm = profileEditModal.querySelector(".modal__form");
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
  document.removeEventListener("keyup", closeModalWithEscButton);
  modal.removeEventListener("mousedown", closeModalWithOverlayClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalWithEscButton);
  modal.addEventListener("mousedown", closeModalWithOverlayClick);
}

function closeModalWithEscButton(e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

function closeModalWithOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function openProfileModal() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
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

/////////////
/// EVENT HANDLERS
/////////////

editProfileButton.addEventListener("click", openProfileModal);

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

initialCards.reverse().forEach((data) => renderCard(data, placesList));

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
  addForm.reset();
});
