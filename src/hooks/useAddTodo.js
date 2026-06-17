import { useState } from 'react';
import { requestCreateTask } from '../requests';

export const useAddTodo = (setterDataTodos) => {
	const [errorMessage, setErrorMessage] = useState('');

	const onClickAddBtn = () => {
		setErrorMessage('');
	};

	const onCloseFormAdd = () => {
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
		});
	};

	return {
		errorMessage,
		onClickAddBtn,
		onSubmitAddTask,
		onCloseFormAdd,
	};
};
