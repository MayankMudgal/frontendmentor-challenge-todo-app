import CheckButton from "./check-button.component.js";
import CrossButton from "./cross-button.component.js";

const TodoItem = ({ id, todo, completed }) => `
    <li class="todo ${
      completed ? "todo--completed" : ""
    }" draggable="true" data-id=${id}>
        ${CheckButton(completed)}
        <p class="todo__text">${todo}</p>
        ${CrossButton()}
    </li>
`;

export default TodoItem;
