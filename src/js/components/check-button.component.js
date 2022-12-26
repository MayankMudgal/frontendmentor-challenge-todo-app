const icons = new URL("../../img/icons.svg", import.meta.url);

const CheckButton = (completed) => `
    <button class="btn btn-completed btn--round" aria-label="check">
        <svg class="icon icon-check ${completed ? "" : "hidden"}">
        <use href="${icons}#icon-check" />
        </svg>
    </button>
`;

export default CheckButton;
