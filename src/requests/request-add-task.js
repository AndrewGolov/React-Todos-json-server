import { createTask } from '../utils/api';

export const requestCreateTask = ({ value, setterDataTodos, setErrorMessage, setIsAddingTask }) => {
	createTask({ title: value })
		.then((task) => {
			setterDataTodos((prev) => [...prev, task]);
			setErrorMessage('');
			setIsAddingTask(false);
		})
		.catch((error) => {
			setErrorMessage('Ошибка запроса ...');
			console.log('Ошибка запроса ...', error);
		});
};
