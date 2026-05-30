import './App.css';
import { useState, useEffect } from 'react';
import { Loader, TodoListComp, ActionBar } from './components';
import { readTodos, createTask, updateTask, searchTasks } from './utils';
import { AppContext } from './context/AppContext';

export const App = () => {
	const [dataTodos, setDataTodos] = useState([]);
	const [isLoadingJsonServer, setIsLoadingJsonServer] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

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
				setDataTodos((prev) => [...prev, task]);
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
				setDataTodos((prev) =>
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
		if (!isOpenSearch) {
			clearSearch();
		}
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

	if (isLoadingJsonServer) {
		return <Loader />;
	}
	const renderTodos = isSearchingMode ? searchResults : dataTodos;

	return (
		<AppContext value={{ isAddingTask, onClickAddBtn, onSubmitAddTask, errorMessage }}>
			<div className="app__wrapper">
				<div className="list__wrapper">
					<h4>Тудушка JSON Server</h4>
					<div className="list__header">
						<ActionBar
							isOpenSearch={isOpenSearch}
							onToggle={onClickSearchBtn}
							handleSearch={handleSearchTask}
							clearSearch={clearSearch}
							isOpenSearch={isOpenSearch}
							isSorted={isSorted}
							handleSortList={handleSortList}
						/>
					</div>

					<TodoListComp dataTodos={renderTodos} handleCompletedTask={handleCompletedTask} />
				</div>
			</div>
		</AppContext>
	);
};
