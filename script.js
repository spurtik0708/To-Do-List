(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {
      // prevent default behaviour - Page reload
      e.preventDefault();
      // give item a unique ID
      let itemId = String(Date.now());
      // get/assign input value
      let toDoItem = input.value;
      // Get due date and priority from the form
      let dueDate = document.getElementById('dueDate').value;
      let priority = document.getElementById('priority').value;

      // pass ID, item, due date, and priority into functions
      addItemToDOM(itemId, toDoItem, dueDate, priority);
      addItemToArray(itemId, toDoItem, dueDate, priority);
      // clear the input box. (this is default behaviour but we got rid of that)
      input.value = '';
  });

  ul.addEventListener('click', e => {
      let id = e.target.closest('li').getAttribute('data-id');
      if (!id) return // user clicked in something else
      // pass id through to functions
      removeItemFromDOM(id);
      removeItemFromArray(id);
  });

  // functions
  function addItemToDOM(itemId, toDoItem, dueDate, priority) {
      // create an li
      const li = document.createElement('li')
      li.setAttribute("data-id", itemId);
      // add toDoItem text to li
      li.innerHTML = `
    <input type="checkbox" class="checkbox">
    ${toDoItem}
    <span class="due-date">Due: ${dueDate}</span>
    <span class="priority">Priority: ${priority}</span>
    <button class="deleteButton">Delete</button>
  `;
      // add li to the DOM
      ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem, dueDate, priority) {
      // add item to array as an object with an ID so we can find and delete it later
      toDoListArray.push({itemId, toDoItem, dueDate, priority});
      console.log(toDoListArray);
  }

  function removeItemFromDOM(id) {
      // get the list item by data ID
      var li = document.querySelector('[data-id="' + id + '"]');
      // remove list item
      ul.removeChild(li);
  }

  function removeItemFromArray(id) {
      // create a new toDoListArray with all li's that don't match the ID
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
  }

})();
