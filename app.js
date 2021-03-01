// Selectors
let form = document.querySelector('form');
let newTask = form.querySelector('input');
let incompleteUl = document.querySelector('.incomplete-ul');
let completedUl = document.querySelector('.completed-ul');
let incompletedTaskFilter = document.querySelector('.incompleted-task-filter');
let completedTaskFilter = document.querySelector('.completed-task-filter');

// Functions
let createTask = function (task) {
  let listItem = document.createElement('li');
  let checkBox = document.createElement('input');
  let label = document.createElement('label');

  listItem.classList = 'list-item py-2 border-bottom';
  label.innerHTML = task;
  checkBox.type = 'checkbox';

  listItem.appendChild(checkBox);
  listItem.appendChild(label);

  return listItem;
};

let addTask = function (e) {
  e.preventDefault();
  if (newTask.value.length <= 0 || newTask.value.trim().length <= 0) {
    alert('Please write a task');
  } else {
    let listItem = createTask(newTask.value);
    incompleteUl.appendChild(listItem);

    newTask.value = '';

    bindInCompleteItems(listItem, completedItems);
  }
};

let completedItems = function () {
  let listItem = this.parentNode;
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'btn btn-danger delete-btn';
  listItem.appendChild(deleteBtn);

  let checkBox = listItem.querySelector('input[type="checkbox"]');
  checkBox.remove();

  completedUl.appendChild(listItem);

  bindCompleteItems(listItem, deleteItem);
};

let deleteItem = function () {
  let listItem = this.parentNode;
  completedUl.removeChild(listItem);
};

let bindCompleteItems = function (taskItem, deleteBtnClick) {
  let deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.onclick = deleteBtnClick;
};

let bindInCompleteItems = function (taskItem, checkBoxClick) {
  let checkBox = taskItem.querySelector('input[type="checkbox"]');
  checkBox.onchange = checkBoxClick;
};

for (let i = 0; i < incompleteUl.children.length; i++) {
  bindInCompleteItems(incompleteUl.children[i], completedItems);
}
for (let i = 0; i < completedUl.children.length; i++) {
  bindCompleteItems(completedUl.children[i], deleteItem);
}

form.addEventListener('submit', addTask);

// Incomplete Task Filter
incompletedTaskFilter.addEventListener('keyup', incompletedSearchIteam);
function incompletedSearchIteam(e) {
  let filterText = incompletedTaskFilter.value.trim().toLowerCase();
  let items = incompleteUl.getElementsByTagName('li');
  Array.from(items).forEach(function (item) {
    let itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(filterText) != -1) {
      item.style = 'display: flex !important';
    } else {
      item.style = 'display: none !important';
    }
  });
}

// Complete Task Filter
completedTaskFilter.addEventListener('keyup', completedSearchIteam);
function completedSearchIteam(e) {
  let filterText = completedTaskFilter.value.trim().toLowerCase();
  let items = completedUl.getElementsByTagName('li');
  Array.from(items).forEach(function (item) {
    let itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(filterText) != -1) {
      item.style = 'display: block !important';
    } else {
      item.style = 'display: none !important';
    }
  });
}
