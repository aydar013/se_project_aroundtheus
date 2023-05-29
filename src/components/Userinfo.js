export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
    console.log(this._avatar.src);
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  getUserId() {
    return {
      user: this._element.textContent,
    };
  }
}
