document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('inputs');
  const addButton = document.getElementById('addsBtn');
  const listContainer = document.getElementById('container');
  const clearButton = document.getElementById('clrBtn');
  let kipawashop = JSON.parse(localStorage.getItem('KpwShop')) || [];

   renderList() => {
    listContainer.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        if (item.purchased) {
            listItem.classList.add('purchased');
        }
        listItem.innerHTML = `
            <span contenteditable="true">${item.name}</span>
            <button onclick="markPurchased(${index})">Mark Purchased</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        listContainer.appendChild(listItem);
    });
}