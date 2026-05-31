import './App.css';
import { useState } from 'react';
import { Loader, TodoListComponent, ActionBar } from './components';
import { createTask, searchTasks } from './utils';
import { AppContext } from './context/AppContext';
import { useGetDataTodos } from './hooks';
import { requestCompleteTask } from './requests/request-complete-task';

export const App = () => {
	const [isSorted, setIsSorted] = useState(false);
	const { dataTodos, isLoadingJsonServer, setterDataTodos } = useGetDataTodos(isSorted);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [searchPhrase, setSearchPhrase] = useState('');

	const onClickAddBtn = () => {
		setIsAddingTask((prev) => !prev);
		setIsOpenSearch(false);
		setErrorMessage('');
	};

	const onSubmitAddTask = ({ value }) => {
		if (!value.trim()) {
			setErrorMessage('Это поле не должно быть пустым...');
			return;
		}

		createTask({ title: value.trim() })
			.then((task) => {
				setterDataTodos((prev) => [...prev, task]);
				setErrorMessage('');
				setIsAddingTask(false);
			})
			.catch((error) => {
				console.log('Ошибка запроса ...', error);
			});
	};

	const handleCompletedTask = (idTask) => {
		const task = dataTodos.find((todo) => todo.id === idTask);
		if (!task) return;
		requestCompleteTask(idTask, task, setterDataTodos, setSearchPhrase);
	};

	const handleSortList = () => {
		setIsSorted((prev) => !prev);
	};

	const clearSearch = () => {
		setIsSearchingMode(false);
		setSearchPhrase('');
	};
	const onClickSearchBtn = () => {
		setIsOpenSearch((prev) => !prev);
		setIsAddingTask(false);
		clearSearch();
	};

	const handleSearchTask = (searchPhrase) => {
		if (!searchPhrase.trim()) return;
		setIsSearchingMode(true);
		searchTasks(searchPhrase)
			.then(() => {
				setSearchPhrase(searchPhrase);
			})
			.catch((error) => {
				console.error('Ошибка при поиске задач', error);

				setSearchPhrase('');
			});
	};

	if (isLoadingJsonServer) {
		return <Loader />;
	}
	const renderTodos = isSearchingMode ? dataTodos.filter((todo) => todo.title.includes(searchPhrase)) : dataTodos;

	return (
		<AppContext
			value={{
				TodoList: renderTodos,
				setDataTodos: setterDataTodos,
				isAddingTask,
				onClickAddBtn,
				onSubmitAddTask,
				errorMessage,
				handleSearchTask,
				isOpenSearch,
				onClickSearchBtn,
				clearSearch,
				isSorted,
				handleSortList,
				handleCompletedTask,
			}}
		>
			<div className="app__wrapper">
				<div className="list__wrapper">
					<h4>Тудушка JSON Server</h4>
					<div className="list__header">
						<ActionBar />
					</div>

					<TodoListComponent />
				</div>
			</div>
		</AppContext>
	);
};
