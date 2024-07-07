document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("item-input");
  const addButton = document.getElementById("add-button");
  const listContainer = document.getElementById("list-container");
  const clearButton = document.getElementById("clear-button");

  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  // Function to render the shopping list
  function renderList() {
    listContainer.innerHTML = "";
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-item";
      if (item.purchased) {
        listItem.classList.add("purchased");
      }
      listItem.innerHTML = `
                <span contenteditable="true">${item.name}</span>
                <button onclick="markPurchased(${index})">Mark Purchased</button>
                <button onclick="deleteItem(${index})">Delete</button>
            `;
      listContainer.appendChild(listItem);
    });
  }

  // Function to add a new item
  function addItem() {
    const itemName = input.value.trim();
    if (itemName !== "") {
      shoppingList.push({ name: itemName, purchased: false });
      input.value = "";
      updateLocalStorage();
      renderList();
    }
  }

  // Function to mark an item as purchased
  window.markPurchased = function (index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    updateLocalStorage();
    renderList();
  };

  // Function to delete an item
  window.deleteItem = function (index) {
    shoppingList.splice(index, 1);
    updateLocalStorage();
    renderList();
  };

  // Function to clear the entire list
  function clearList() {
    shoppingList = [];
    updateLocalStorage();
    renderList();
  }

  // Function to update local storage
  function updateLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }

  // Attach event listeners
  addButton.addEventListener("click", addItem);
  clearButton.addEventListener("click", clearList);

  // Initial render
  renderList();
});
