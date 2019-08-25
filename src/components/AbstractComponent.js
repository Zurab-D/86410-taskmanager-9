export class AbstractComponent {
  constructor() {
    this._element = null;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  createElement() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.getTemplate();
    return newElement.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
