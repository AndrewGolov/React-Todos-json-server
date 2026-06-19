import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTodosSelector } from '../components/selectors';
import { getData } from '../utils/api';

export const useGetDataTodos = (isSorted = false) => {
	const todos = useSelector(dataTodosSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getData(isSorted));
	}, [isSorted, dispatch]);

	return { todos };
};
