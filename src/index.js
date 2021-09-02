import './styles.scss';

const app = document.getElementById('todos');
const form = app.querySelector('form');
const todoList = app.querySelector('ul');
const actions = app.querySelector('#actions');
const close = document.querySelector('#close');
let todos = {};

// add testing

function init() {
  todos = {
    ...todos,
    ...JSON.parse(localStorage.getItem('todos')),
  };
  updateInterface();
}

function updateInterface() {
  todoList.innerHTML = generateListItems();

  if (Object.keys(todos).length > 0) {
    app.scrollTop = app.scrollTopMax;
    if (!document.getElementById('deleteTodos')) {
      let button = document.createElement('button');
      button.id = 'deleteTodos';
      button.textContent = 'remove all';
      button.title = 'click to remove all todo items';
      button.onclick = removeAllTodos;
      actions.append(button);

      close.onclick = removeAllTodos;
      close.title = 'click to remove all todo items';
      close.classList = 'close--active';
    }
  } else {
    if (document.getElementById('deleteTodos')) {
      document.getElementById('deleteTodos').remove();
      close.onclick = null;
      close.classList = '';
    }
  }
}

function generateListItems() {
  let todosArray = Object.values(todos).map((todo) => {
    let classes = todo.done ? 'todo_li--completed' : '';
    let html = '';
    html += `<li class="todo_li ${classes}" data-id="${todo.id}" data-done="${todo.done}" title="click to mark complete">`;
    html += `<div>${todo.done ? '&#10004;' : '&#10065;'}</div>`;
    html += `<span>${todo.text}</span>`;
    html += `<button class="delete" title="click to delete the todo item">&#10006;</button>`;
    html += `</li>`;
    return html;
  });
  return todosArray.join('\n');
}

function dispatchUpdate() {
  localStorage.setItem('todos', JSON.stringify(todos));
  updateInterface();
}

function addTodo(value) {
  let id = Object.keys(todos).length + 1;
  todos[id] = {
    id: id,
    done: false,
    text: value,
  };
  dispatchUpdate();
}

function completeTodo(id) {
  let completedTodo = { done: !todos[id].done };
  todos[id] = {
    ...todos[id],
    ...completedTodo,
  };
  dispatchUpdate();
}

function removeTodo(id) {
  delete todos[id];
  dispatchUpdate();
}

function removeAllTodos() {
  todos = {};
  dispatchUpdate();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = e.target[0].value;
  if (value.length > 0) {
    addTodo(value);
    e.target[0].value = '';
  }
});

todoList.addEventListener('click', (e) => {
  // console.log('click', e);
  const el = e.target;
  if (el.classList.contains('delete')) {
    removeTodo(el.parentElement.dataset.id);
  } else if (el.parentElement.classList.contains('todo_li')) {
    completeTodo(el.parentElement.dataset.id);
  }
});

init(); // init
