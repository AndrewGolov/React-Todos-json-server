export const updateTodoList = (todoData, newTodoData) =>
	todoData.map((todo) => (todo.id === newTodoData.id ? { ...todo, ...newTodoData } : todo));
