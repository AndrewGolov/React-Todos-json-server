import { useState } from 'react';
import { requestCreateTask } from '../requests';

export const useAddTodo = (setterDataTodos) => {
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onClickAddBtn = () => {
		setIsAddingTask((prev) => !prev);
		setErrorMessage('');
	};

	const onCloseFormAdd = () => {
		setIsAddingTask(false);
		setErrorMessage('');
	};
	const onSubmitAddTask = (value) => {
		if (!value.trim()) {
			setErrorMessage('Это поле не должно быть пустым...');
			return;
		}

		requestCreateTask({
			value,
			setterDataTodos,
			setErrorMessage,
			setIsAddingTask,
		});
	};

	return {
		isAddingTask,
		errorMessage,
		onClickAddBtn,
		onSubmitAddTask,
		onCloseFormAdd,
	};
};
