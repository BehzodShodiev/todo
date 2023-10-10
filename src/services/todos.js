// Function to get todos from local storage
export const getTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return storedTodos;
};

// Function to set todos in local storage
export const setTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get a specific todo by ID
export const getTodo = (id) => {
  const storedTodos = getTodos();
  const todo = storedTodos.find((todo) => todo.id === id);
  return todo || {};
};

// Function to update a todo
export const updateTodo = (todo) => {
  const todos = getTodos();

  const updatedTodos = todos.map((item) => {
    if (item.id == todo.id) {
      return { ...item, title: todo.title, description: todo.description };
    }
    return item;
  });
  setTodos(updatedTodos);
};

// Function to add a new todo
export const addTodo = (todo) => {
  const storedTodos = getTodos();
  if (todo.priority) storedTodos.unshift(todo);
  if (!todo.priority) storedTodos.push(todo);
  setTodos(storedTodos);
  return storedTodos;
};

// Function to remove a todo
export const removeTodo = (id) => {
  const storedTodos = getTodos();
  const updatedTodos = storedTodos.filter((item) => item.id !== id);
  setTodos(updatedTodos);
};

/**
 * Function to handle filtering todos based on type.
 *
 * @param {number} type - The type of filter to apply. 0 for all, 1 for not completed, and 2 for completed.
 */
export const filterTodos = (type) => {
  const allTodos = getTodos();
  if (type == 0) return allTodos;
  if (type == 1) return allTodos.filter((item) => !item.completed);
  if (type == 2) return allTodos.filter((item) => item.completed);
};

// Function to search todos based on query and tabsValue
export const searchTodo = (query, tabsValue) => {
  const allTodos = getTodos();
  let foundTodos = allTodos.filter((item) => {
    if (tabsValue == 0) {
      if (
        item.title
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
        return true;
    } else if (tabsValue == 1) {
      if (item.title.indexOf(query) > -1 && !item.completed) return true;
    } else {
      if (item.title.indexOf(query) > -1 && item.completed) return true;
    }
    return false;
  });
  return foundTodos;
};
