import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered(e.g. recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns
   */
  render(data, render = true) {
    this._data = data;
    const markUp = this._generateMarkUp();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];
      //updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //updates changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUpSpinner = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    // this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUpSpinner);
  }

  renderError(message = this._errorMessage) {
    const markUp = `
            <div class="error">
            <div>
                <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
            </div>
          `;
    this._clear();
    // this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
            <div class="error">
            <div>
                <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
            </div>
          `;
    this._clear;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
