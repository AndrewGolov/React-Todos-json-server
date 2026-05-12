import { useState, useEffect } from 'react';

import { readTodos, createTask, normalizeData, deleteTask, updateTask, updateTodoList, searchTasks } from './utils';
import './App.css';

import { JsonTodoListApp, Loader } from './components';

export const App = () => {
	const [dataTodos, setDataTodos] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [isLoadingJsonServer, setIsLoadingJsonServer] = useState(true);
	const [isSorted, setIsSorted] = useState(false);
	const [editTaskId, setEditTaskId] = useState(null);
	const [isSearchingMode, setIsSearchingMode] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const setErrorsMesage = (err) => (err ? setErrorMessage(err) : setErrorMessage(''));

	const onSubmitAddTask = ({ event, newTask }) => {
		event.preventDefault();
		if (!newTask.trim()) {
			setErrorsMesage('Это поле не должно быть пустым...');
			return;
		}
		createTask({ title: newTask })
			.then((task) => {
				setDataTodos((prev) => [...prev, task]);
				setErrorMessage('');
			})
			.catch((error) => {
				console.log('Ошибка запроса ...', error);
			});
	};

	const handleDeleteTask = (id) => {
		deleteTask({ idTask: id })
			.then(() => setDataTodos((prev) => prev.filter((task) => task.id !== id)))
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	const handleCompletedTask = (idTask) => {
		const task = dataTodos.find((task) => task.id === idTask);
		if (!task) return;
		updateTask(idTask, {
			completed: !task.completed,
		})
			.then(() =>
				setDataTodos((prev) =>
					prev.map((task) =>
						task.id === idTask
							? {
									...task,
									completed: !task.completed,
								}
							: task,
					),
				),
			)
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	const handleSortList = () => setIsSorted((prev) => !prev);

	const onDoubleClickEditTask = (id) => setEditTaskId(id);

	const onSubmitEditTask = ({ e, editTaskValue }) => {
		e.preventDefault();
		updateTask(editTaskId, { title: editTaskValue })
			.then(() => setDataTodos((prev) => updateTodoList(prev, { id: editTaskId, title: editTaskValue })))

			.catch((error) => console.log('Ошибка изменениняу данных', error))
			.finally(() => setEditTaskId(null));
	};
	const onCancelEditingTask = () => setEditTaskId(null);

	const handleSearchTask = (searchPhrase) => {
		if (!searchPhrase.trim()) {
			setIsSearchingMode(false);
			setSearchResults([]);
			return;
		}
		setIsSearchingMode(true);
		searchTasks(searchPhrase)
			.then((respData) => {
				setSearchResults(normalizeData(respData));
			})
			.catch((error) => {
				console.error('Ошибка при поиске задач', error);
				setSearchResults([]);
			});
	};

	const handleClearSearch = () => {
		setIsSearchingMode(false);
		setSearchResults([]);
	};

	useEffect(() => {
		readTodos(isSorted)
			.then((respData) => {
				setDataTodos(normalizeData(respData));
			})
			.catch((error) => {
				console.error('Ошибка при загрузке задач', error);
			})
			.finally(() => {
				setIsLoadingJsonServer(false);
				console.log('Загрузка данных с сервера завершена');
			});
	}, [isSorted]);

	return (
		<div className="app__wrapper">
			{isLoadingJsonServer ? (
				<Loader />
			) : (
				<JsonTodoListApp
					dataArr={isSearchingMode ? searchResults : dataTodos}
					onSubmitAddTask={onSubmitAddTask}
					handleDeleteTask={handleDeleteTask}
					handleCompletedTask={handleCompletedTask}
					handleSortList={handleSortList}
					errorMessage={errorMessage}
					errorsSet={setErrorsMesage}
					onDoubleClickEditTask={onDoubleClickEditTask}
					editTaskId={editTaskId}
					onSubmitEditTask={onSubmitEditTask}
					onCancelEditingTask={onCancelEditingTask}
					handleSearchTask={handleSearchTask}
					handleClearSearch={handleClearSearch}
					isSearching={isSearchingMode}
				/>
			)}
		</div>
	);
};
