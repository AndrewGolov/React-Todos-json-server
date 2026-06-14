import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTodos } from '../components/selectors';
import { getData } from '../utils/api';

export const useGetDataTodos = (isSorted = false) => {
	const todos = useSelector(dataTodos);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getData(isSorted));
	}, [isSorted]);

	return { todos };
};
