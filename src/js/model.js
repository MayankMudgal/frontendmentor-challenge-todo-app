class Model {
  _state = {
    darkMode: false,
    selectedFilter: "all",
    todos: [],
    completedTodos: [],
  };

  _storeState() {
    localStorage.clear();
    localStorage.setItem("state", JSON.stringify(this._state));
  }

  getStoredState() {
    const storedState = localStorage.getItem("state");
    if (storedState) this._state = JSON.parse(storedState);
  }

  clearStorage() {
    localStorage.clear();
  }

  getDarkMode() {
    return this._state.darkMode;
  }

  setDarkMode() {
    this._state.darkMode = !this._state.darkMode;
    this._storeState();
  }

  addTodo(todo) {
    const id = Date.now();
    const todoObj = {
      id,
      todo,
      completed: false,
    };
    this._state.todos.push(todoObj);

    this._storeState();
    return todoObj;
  }

  getTodos() {
    return [...this._state.todos];
  }

  getTodosLeft() {
    const todosLeft =
      this._state.todos.length - this._state.completedTodos.length;
    return todosLeft;
  }

  isTodoComplete(todoId) {
    return this._state.completedTodos.includes(todoId);
  }

  markTodoComplete(todoId) {
    this._state.completedTodos.push(todoId);
    const newTodos = this._state.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: true } : todo
    );
    this._state.todos = newTodos;
    this._storeState();
  }

  markTodoIncomplete(todoId) {
    const index = this._state.completedTodos.indexOf(todoId);
    this._state.completedTodos.splice(index, 1);
    const newTodos = this._state.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: false } : todo
    );
    this._state.todos = newTodos;
    this._storeState();
  }

  getCompletedTodos() {
    return [...this._state.completedTodos];
  }

  deleteTodo(todoId) {
    const todoIndex = this._state.todos.findIndex((todo) => todo.id === todoId);
    this._state.todos.splice(todoIndex, 1);
    const completedTodoIndex = this._state.completedTodos.indexOf(todoId);
    this._state.completedTodos.splice(completedTodoIndex, 1);
    this._storeState();
  }

  getListFilter() {
    return this._state.selectedFilter;
  }

  setListFilter(selectedFilter) {
    this._state.selectedFilter = selectedFilter;
    this._storeState();
  }

  orderTodos(sourceIndex, targetIndex) {
    const movedTodo = this._state.todos.splice(sourceIndex, 1);
    this._state.todos.splice(targetIndex, 0, ...movedTodo);

    this._storeState();
  }
}

export default new Model();
