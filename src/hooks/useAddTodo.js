import { useState } from 'react';
export const useAddTodo = () => {
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	return { isAddingTask, setIsAddingTask, errorMessage, setErrorMessage };
};
