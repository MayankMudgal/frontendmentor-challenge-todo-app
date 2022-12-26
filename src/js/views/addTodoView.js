class AddTodoView {
  _parentElement = document.querySelector('.add-todo');

  addHandlerAddTodo(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const todo = this.querySelector('.add-todo__field').value;
      this.querySelector('.add-todo__field').value = '';
      handler(todo);
    });
  }
}

export default new AddTodoView();
