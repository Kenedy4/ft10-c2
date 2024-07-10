document.addEventListener("DOMContentLoaded", () => {
  // Launching event listener that runs the code inside when the DOM content is fully loaded
  // Fetching HTML related elements
  const input = document.getElementById("inputs");
  const addButton = document.getElementById("addsBtn");
  const listContainer = document.getElementById("container");
  const clearButton = document.getElementById("clrBtn");

  // Retrieving the shopping list from local storage as well as as initializing an empty array if not found
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  // This function creates the shopping list
  function kipawaAddList() {
    // Clear the current list
    listContainer.innerHTML = "";
    // Iterate over each item in the shopping list
    shoppingList.forEach((item, index) => {
      // Create a new list item element
      const listItem = document.createElement("li");
      listItem.className = "items";
      // Add "purchased" class if the item is marked as purchased
      if (item.purchased) {
        listItem.classList.add("purchased");
      }
      // Set the inner HTML of the list item with the item name and buttons
      listItem.innerHTML = `
        <span contenteditable="true">${item.name}</span>
        <button onclick="markPurchased(${index})">Mark Purchased</button>
      `;
      // Append the list item to the list container
      listContainer.appendChild(listItem);
    });
  }

  // Function to add a new item
  function addItem() {
    const itemName = input.value.trim();
    if (itemName !== "") {
      // Add new item to the shopping list
      shoppingList.push({ name: itemName, purchased: false });
      // Clear the input field
      input.value = "";
      // Update local storage and render the updated list
      dummyStorage();
      kipawaAddList();
    }
  }

  // Function to mark an item as purchased
  document.markPurchased = (index) => {
    // Toggle the purchased status of the item
    shoppingList[index].purchased = !shoppingList[index].purchased;
    // Update local storage and render the updated list
    dummyStorage();
    kipawaAddList();
  };

  // Function to clear the entire list
  function clearList() {
    // Clear the shopping list array
    shoppingList = [];
    // Update local storage and render the cleared list
    dummyStorage();
    kipawaAddList();
  }

  // Function to update local storage with the current shopping list
  function dummyStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }

  // Attach event listeners to the buttons
  addButton.addEventListener("click", addItem);
  clearButton.addEventListener("click", clearList);

  // Initial render of the shopping list
  kipawaAddList();
});
