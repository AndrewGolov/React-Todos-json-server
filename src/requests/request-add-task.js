import { createTask } from '../utils/api';

export const requestCreateTask = ({ value, setterDataTodos, setterErrorMessage, setterIsAddingTask }) => {
	createTask({ title: value })
		.then((task) => {
			setterDataTodos((prev) => [...prev, task]);
			setterErrorMessage('');
			setterIsAddingTask(false);
		})
		.catch((error) => {
			setterErrorMessage('Ошибка запроса ...');
			console.log('Ошибка запроса ...', error);
		});
};
