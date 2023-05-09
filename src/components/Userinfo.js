export default class UserInfo {
  constructor({ name, description }) {
    this.name = document.querySelector(name);
    this.description = document.querySelector(description);
    console.log(this.name);
  }

  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      description: this.description.textContent,
    };

    return userInfo;
  }

  setUserInfo({ name, description }) {
    this.name.textContent = name;
    this.description.textContent = description;
  }
}
