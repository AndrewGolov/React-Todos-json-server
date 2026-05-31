import { useState, useEffect } from 'react';
import { readTodos } from '../utils';

export const useGetDataTodos = (isSorted) => {
	const [dataTodos, setDataTodos] = useState([]);
	const [isLoadingJsonServer, setIsLoadingJsonServer] = useState(true);
	const setterDataTodos = (data) => {
		setDataTodos(data);
	};
	useEffect(() => {
		readTodos({ isSorted })
			.then((respData) => {
				setDataTodos(respData);
			})
			.catch((error) => {
				console.error('Ошибка при загрузке задач', error);
			})
			.finally(() => {
				setIsLoadingJsonServer(false);
			});
	}, [isSorted]);

	return { dataTodos, isLoadingJsonServer, setterDataTodos };
};
