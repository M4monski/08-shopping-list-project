const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list'); //ul
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDom(item);
  });
  checkUI();
}

function onAddItemSUbmit(e) {
  e.preventDefault();

  const NewItem = itemInput.value;
  //Validate Input
  if (NewItem === '') {
    alert('Please please input Item to add');
    return;
  }

  //Create item DOM element
  addItemToDom(NewItem);

  //Add item to local storage
  addItemToStorage(NewItem);

  checkUI();

  itemInput.value = '';
}

function addItemToDom(item) {
  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //ADD LI TO DOM
  itemList.appendChild(li);
  const items = itemList.querySelectorAll('li');
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  //Add new item to array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  item.classList.toggle('edit-mode');
}

//REMOVE ITEM
function removeItem(item) {
  if (confirm('Are you sure?')) {
    //Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //Fitler out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i != item);

  // Re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAllItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //Clear from localStorage
  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Initialize app
function init() {
  //Event Listernenrs
  itemForm.addEventListener('submit', onAddItemSUbmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', removeAllItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
// localStorage.setItem('name', 'Honey');
// console.log(localStorage.getItem('name'));
// // localStorage.removeItem('name');
// localStorage.clear();
