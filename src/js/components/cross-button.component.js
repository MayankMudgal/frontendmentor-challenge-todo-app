const icons = new URL("../../img/icons.svg", import.meta.url);

const CrossButton = () => `
    <button class="btn btn-delete hidden" aria-label="cross">
        <svg class="icon icon-cross">
        <use href="${icons}#icon-cross" />
        </svg>
    </button>
`;

export default CrossButton;
