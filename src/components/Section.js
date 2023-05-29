export default class Section {
  constructor({ renderer, items }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
