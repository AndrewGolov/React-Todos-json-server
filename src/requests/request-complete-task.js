import { updateTask } from '../utils/api';

export const requestCompleteTask = (idTask, task, setterDataTodos) => {
	updateTask(idTask, {
		completed: !task.completed,
	})
		.then(() => {
			setterDataTodos((prev) =>
				prev.map((todo) =>
					todo.id === idTask
						? {
								...todo,
								completed: !todo.completed,
							}
						: todo,
				),
			);
		})
		.catch((error) => console.log('Ошибка запроса ...', error));
};
