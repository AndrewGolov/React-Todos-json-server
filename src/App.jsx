import './App.css';
import { useState } from 'react';
import { Loader, TodoListComponent, ActionBar } from './components';
import { createTask, updateTask, searchTasks } from './utils';
import { AppContext } from './context/AppContext';
import { useGetDataTodos } from './hooks';

export const App = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { dataTodos, isLoadingJsonServer, setterDataTodos } = useGetDataTodos(isSorted);

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
		const task = dataTodos.find((task) => task.id === idTask);
		if (!task) return;
		updateTask(idTask, {
			completed: !task.completed,
		})
			.then(() => {
				setterDataTodos((prev) =>
					prev.map((task) =>
						task.id === idTask
							? {
									...task,
									completed: !task.completed,
								}
							: task,
					),
				);

				setSearchResults((prev) =>
					prev.map((task) =>
						task.id === idTask
							? {
									...task,
									completed: !task.completed,
								}
							: task,
					),
				);
			})
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	const handleSortList = () => {
		setIsSorted((prev) => !prev);
	};

	const clearSearch = () => {
		setIsSearchingMode(false);
		setSearchResults([]);
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
			.then((respData) => {
				setSearchResults(respData);
			})
			.catch((error) => {
				console.error('Ошибка при поиске задач', error);

				setSearchResults([]);
			});
	};

	if (isLoadingJsonServer) {
		return <Loader />;
	}
	const renderTodos = isSearchingMode ? searchResults : dataTodos;

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
