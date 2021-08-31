const app = document.getElementById('todos');
const form = app.querySelector('form');
const todoList = app.querySelector('ul');
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
    if (!document.getElementById('deleteTodos')) {
      let button = document.createElement('button');
      button.id = 'deleteTodos';
      button.textContent = 'Remove All';
      button.onclick = removeAllTodos;
      app.prepend(button);
    }
  } else {
    if (document.getElementById('deleteTodos')) {
      document.getElementById('deleteTodos').remove();
    }
  }
}

function generateListItems() {
  let todosArray = Object.values(todos).map((todo) => {
    let classes = todo.done ? 'todo_li--completed' : '';
    let html = '';
    html += `<li class="todo_li ${classes}" data-id="${todo.id}" data-done="${todo.done}">`;
    html += `<div>${todo.done ? '&#10004;' : '&#10065;'}</div>`;
    html += `<span>${todo.text}</span>`;
    html += `<button title="delete">&#10006;</button>`;
    html += `</li>`;
    return html;
  });
  return todosArray.join('\n');
}

function dispatchUpdate() {
  localStorage.setItem('todos', JSON.stringify(todos)); // update local storage
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
  if (e.target.localName === 'button') {
    removeTodo(e.target.parentElement.dataset.id);
  } else if (e.target.parentElement.localName === 'li') {
    completeTodo(e.target.parentElement.dataset.id);
  }
});

init(); // init
