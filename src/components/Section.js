export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.reverse().forEach(this._renderer);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
