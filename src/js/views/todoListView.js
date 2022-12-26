import TodoItem from '../components/todo-item.component.js';

class TodoListView {
  _todosElement = document.querySelector('.todos');
  _todosLeftElement = document.querySelector('.todos-left').firstElementChild;
  _clearCompletedButton = document.querySelector('.btn-clear-completed');
  _filterButtonsElement = document.querySelector('.filter-buttons');

  constructor() {
    this._todoHover();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerTodoComplete(handler) {
    const self = this;
    this._todosElement.addEventListener('click', function (e) {
      const todo = e.target.closest('.todo');

      if (!todo || e.target.closest('.btn-delete')) return;

      const id = +todo.dataset.id;

      todo.classList.toggle('todo--completed');
      todo.querySelector('.icon-check').classList.toggle('hidden');

      handler(id);
    });
  }

  addHandlerTodoDelete(handler) {
    this._todosElement.addEventListener('click', function (e) {
      const todo = e.target.closest('.todo');

      if (!todo || !e.target.closest('.btn-delete')) return;

      const id = +todo.dataset.id;
      todo.remove();
      handler(id);
    });
  }

  addHandlerClearCompletedTodos(handler) {
    this._clearCompletedButton.addEventListener('click', handler);
  }

  addHandlerFilterList(handler) {
    this._filterButtonsElement.addEventListener('click', function (e) {
      const clicked = e.target;
      if (!clicked.matches('button')) return;

      this.querySelectorAll('button').forEach((b) =>
        b.classList.remove('btn--active')
      );

      clicked.classList.add('btn--active');

      const filterSelected = clicked.dataset.filter;
      handler(filterSelected);
    });
  }

  addHandlerDragDrop(handler) {
    this._todosElement.addEventListener('dragstart', this._handleDragStart);
    this._todosElement.addEventListener('dragover', this._handleDragOver);
    this._todosElement.addEventListener(
      'drop',
      this._handleDrop.bind(null, handler)
    );
    this._todosElement.addEventListener('dragend', this._handleDragEnd);
  }

  deleteTodoItem(id) {
    const todo = this._todosElement.querySelector(`[data-id='${id}']`);
    todo.remove();
  }

  setTodosLeft(count) {
    this._todosLeftElement.textContent = count;
  }

  setFilterActive(filterSelected) {
    this._filterButtonsElement.querySelectorAll('button').forEach((b) => {
      b.classList.remove('btn--active');
      if (b.dataset.filter === filterSelected) b.classList.add('btn--active');
    });
  }

  filterList(filterSelected) {
    this._todosElement.querySelectorAll('li').forEach((el) => {
      el.classList.remove('hidden');
      if (
        filterSelected === 'active' &&
        el.classList.contains('todo--completed')
      ) {
        el.classList.add('hidden');
      } else if (
        filterSelected === 'completed' &&
        !el.classList.contains('todo--completed')
      ) {
        el.classList.add('hidden');
      }
    });
  }

  render(data) {
    data.forEach((todo) =>
      this._todosElement.insertAdjacentHTML('beforeend', TodoItem(todo))
    );
  }

  _todoHover() {
    this._todosElement.addEventListener('mouseover', function (e) {
      const todo = e.target.closest('.todo');
      if (!todo) return;

      todo.querySelector('.btn-delete').classList.toggle('hidden');
    });

    this._todosElement.addEventListener('mouseout', function (e) {
      const todo = e.target.closest('.todo');
      if (!todo) return;

      todo.querySelector('.btn-delete').classList.toggle('hidden');
    });
  }

  _handleDragStart(e) {
    const sourceEl = e.target.closest('.todo');
    const todosEl = this.querySelectorAll('.todo');
    const SourceIndex = [...todosEl].indexOf(sourceEl);

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/plain', SourceIndex);
  }

  _handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    // return false;
  }

  _handleDrop(handler, e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this);
    const targetEl = e.target.closest('.todo');
    const sourceIndex = +e.dataTransfer.getData('text/plain');
    const todosEl = targetEl.parentElement.querySelectorAll('.todo');
    const sourceElement = [...todosEl][sourceIndex];
    const targetIndex = [...todosEl].indexOf(targetEl);

    if (sourceIndex === targetIndex) return;

    if (sourceIndex < targetIndex) {
      targetEl.parentNode.insertBefore(sourceElement, targetEl.nextSibling);
    } else {
      targetEl.parentNode.insertBefore(sourceElement, targetEl);
    }

    handler(sourceIndex, targetIndex);

    // return false;
  }

  _handleDragEnd(e) {
    console.log(e);
  }
}

export default new TodoListView();
