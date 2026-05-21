import './App.css';
import { useState, useRef, useEffect } from 'react';

import { Loader, Button, Field, TodoItem } from './components';

import { readTodos, createTask, updateTask, searchTasks } from './utils';

import { ImPlus, ImCross, ImList2, ImSortAlphaAsc, ImSearch } from 'react-icons/im';

export const App = () => {
	const [newTask, setNewTask] = useState('');
	const [needFindTask, setNeedFindTask] = useState('');

	const [dataTodos, setDataTodos] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	const [isLoadingJsonServer, setIsLoadingJsonServer] = useState(true);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isSearchingTask, setIsSearchingTask] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);

	const [isSorted, setIsSorted] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const refAddField = useRef(null);
	const refSearchField = useRef(null);

	/* ====================== ADD TASK ====================== */

	const onClickAddBtn = () => {
		setIsAddingTask((prev) => !prev);

		setIsSearchingTask(false);

		setNewTask('');
		setErrorMessage('');
	};

	const onSubmitAddTask = (event) => {
		event.preventDefault();

		if (!newTask.trim()) {
			setErrorMessage('Это поле не должно быть пустым...');
			return;
		}

		createTask({ title: newTask.trim() })
			.then((task) => {
				setDataTodos((prev) => [...prev, task]);

				setNewTask('');
				setErrorMessage('');
				setIsAddingTask(false);
			})
			.catch((error) => {
				console.log('Ошибка запроса ...', error);
			});
	};

	/* ====================== COMPLETE TASK ====================== */

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

	/* ====================== SORT ====================== */

	const handleSortList = () => {
		setIsSorted((prev) => !prev);
	};

	/* ====================== SEARCH ====================== */

	const onClickSearchBtn = () => {
		const nextState = !isSearchingTask;

		setIsSearchingTask(nextState);

		setIsAddingTask(false);

		if (!nextState) {
			handleClearSearch();
			setNeedFindTask('');
		}
	};

	const handleSearchTask = (searchPhrase) => {
		if (!searchPhrase.trim()) {
			handleClearSearch();
			return;
		}

		setIsSearchingMode(true);

		searchTasks(searchPhrase.trim())
			.then((respData) => {
				setSearchResults(respData);
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

	/* ====================== FOCUS ====================== */

	useEffect(() => {
		if (isAddingTask) {
			refAddField.current?.focus();
		}

		if (isSearchingTask) {
			refSearchField.current?.focus();
		}
	}, [isAddingTask, isSearchingTask]);

	/* ====================== LOAD TODOS ====================== */

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

	/* ====================== RENDER ====================== */

	if (isLoadingJsonServer) {
		return <Loader />;
	}

	const renderTodos = isSearchingMode ? searchResults : dataTodos;

	return (
		<div className="app__wrapper">
			<div className="list__wrapper">
				<h4>Тудушка JSON Server</h4>

				<div className="list__controls">
					<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />

					<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />

					<Button type="button" text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />} onClick={handleSortList} />
				</div>

				{/* ====================== ADD FORM ====================== */}

				{isAddingTask && (
					<form onSubmit={onSubmitAddTask}>
						<Field
							type="text"
							placeholder="Введите текст задачи"
							value={newTask}
							onChange={({ target }) => setNewTask(target.value)}
							inpRef={refAddField}
						/>

						{errorMessage && <span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>}

						<div>
							<Button type="submit" text="Добавить" className="list__submit-btn" />

							<Button type="button" text="Отменить" onClick={onClickAddBtn} />
						</div>
					</form>
				)}

				{/* ====================== SEARCH ====================== */}

				{isSearchingTask && (
					<Field
						type="text"
						placeholder="Какую задачу ищем?"
						value={needFindTask}
						onChange={({ target }) => {
							const value = target.value;

							setNeedFindTask(value);

							if (value.trim()) {
								handleSearchTask(value);
							} else {
								handleClearSearch();
							}
						}}
						inpRef={refSearchField}
					/>
				)}

				{/* ====================== TODOS ====================== */}

				<ul className="list">
					{renderTodos.length === 0 ? (
						<div className="list__empty">Список задач пуст</div>
					) : (
						renderTodos.map((item) => (
							<div key={item.id}>
								<TodoItem item={item} handleCompletedTask={handleCompletedTask} />
							</div>
						))
					)}
				</ul>
			</div>
		</div>
	);
};
