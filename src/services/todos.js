export const getTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return storedTodos;
}
export const setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}
export const addTodo = (todo) => {
    const storedTodos = getTodos();
    storedTodos.unshift(todo);
    setTodos(storedTodos);
    return storedTodos;
}