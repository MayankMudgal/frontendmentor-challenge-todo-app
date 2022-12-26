import model from "./model.js";
import addTodoView from "./views/addTodoView.js";
import todoListView from "./views/todoListView.js";
import darkModeView from "./views/darkModeView.js";

const controlAddTodo = function (todo) {
  if (!todo) return;

  const todoObj = model.addTodo(todo);
  todoListView.render([todoObj]);

  todoListView.setTodosLeft(model.getTodosLeft());
};

const controlTodoList = function () {
  // model.clearStorage();
  model.getStoredState();

  const todos = model.getTodos();
  todoListView.render(todos);

  todoListView.setTodosLeft(model.getTodosLeft());
  const listFilter = model.getListFilter();

  todoListView.setFilterActive(listFilter);
  todoListView.filterList(listFilter);

  darkModeView.toggleDarkMode(model.getDarkMode());
};

const controlTodoComplete = function (id) {
  if (model.isTodoComplete(id)) model.markTodoIncomplete(id);
  else model.markTodoComplete(id);

  todoListView.setTodosLeft(model.getTodosLeft());
  todoListView.filterList(model.getListFilter());
};

const controlDeleteTodo = function (id) {
  model.deleteTodo(id);
  todoListView.setTodosLeft(model.getTodosLeft());
};

const controlClearCompletedTodos = function () {
  const completedTodos = model.getCompletedTodos();

  for (const id of completedTodos) {
    model.deleteTodo(id);

    todoListView.deleteTodoItem(id);
  }
};

const controlListFilter = function (filterSelected) {
  model.setListFilter(filterSelected);

  todoListView.filterList(model.getListFilter());
};

const controlDarkMode = function () {
  darkModeView.toggleDarkMode(!model.getDarkMode());

  model.setDarkMode();
};

const controlDragDrop = function (sourceIndex, targetIndex) {
  model.orderTodos(sourceIndex, targetIndex);
};

const init = function () {
  addTodoView.addHandlerAddTodo(controlAddTodo);
  todoListView.addHandlerRender(controlTodoList);
  todoListView.addHandlerTodoComplete(controlTodoComplete);
  todoListView.addHandlerTodoDelete(controlDeleteTodo);
  todoListView.addHandlerClearCompletedTodos(controlClearCompletedTodos);
  todoListView.addHandlerFilterList(controlListFilter);
  todoListView.addHandlerDragDrop(controlDragDrop);
  darkModeView.addHandlerDarkMode(controlDarkMode);
};

init();
