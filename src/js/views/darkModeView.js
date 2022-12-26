const icons = new URL("../../img/icons.svg", import.meta.url);

class DarkModeView {
  _parentElement = document.querySelector(".btn-dark-mode");

  addHandlerDarkMode(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  toggleDarkMode(darkMode) {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");

    const href = `${icons}#icon-${darkMode ? "sun" : "moon"}`;
    this._parentElement.querySelector("use").setAttribute("href", href);
  }
}

export default new DarkModeView();
