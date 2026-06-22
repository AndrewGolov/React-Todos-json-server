/*=============== Служебные импорты ===============*/
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/*=============== Стили и иконки ===============*/
import './App.css';

/*=============== Подключение компонентов ===============*/
import { Loader, TodoListComponent, ActionBar } from './components';

/*=============== Утилиты и функции ===============*/
import { loadingDataSelector, isSortedSelector } from './components/selectors';
import { getData } from './utils/api';

export const App = () => {
	const dispatch = useDispatch();
	const isLoadingJsonServer = useSelector(loadingDataSelector);
	const isSorted = useSelector(isSortedSelector);

	useEffect(() => {
		dispatch(getData({ isSorted }));
	}, [isSorted, dispatch]);

	if (isLoadingJsonServer) {
		return <Loader />;
	}

	return (
		<div className="app__wrapper">
			<div className="list__wrapper">
				<h4>Тудушка JSON Server</h4>
				<div className="list__header">
					<ActionBar />
				</div>

				<TodoListComponent />
			</div>
		</div>
	);
};
