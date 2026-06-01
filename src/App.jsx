import './App.css';
import { useState } from 'react';
import { Loader, TodoListComponent, ActionBar } from './components';
import { AppContext } from './context/AppContext';
import { useGetDataTodos } from './hooks';
import { requestCompleteTask, requestSearchTask, requestCreateTask } from './requests';

export const App = () => {
	const [isSorted, setIsSorted] = useState(false);
	const { dataTodos, isLoadingJsonServer, setterDataTodos } = useGetDataTodos(isSorted);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [searchPhrase, setSearchPhrase] = useState('');

	const setterErrorMessage = (message) => setErrorMessage(message);
	const setterIsAddingTask = (isAdding) => setIsAddingTask(isAdding);
	const setterSearchPhrase = (phrase) => setSearchPhrase(phrase);

	const onClickAddBtn = () => {
		setterIsAddingTask((prev) => !prev);
		setIsOpenSearch(false);
		setterErrorMessage('');
	};

	const onSubmitAddTask = ({ value }) => {
		if (!value.trim()) {
			setterErrorMessage('Это поле не должно быть пустым...');
			return;
		}

		requestCreateTask({ value, setterDataTodos, setterErrorMessage, setterIsAddingTask });
	};

	const handleCompletedTask = (idTask) => {
		const task = dataTodos.find((todo) => todo.id === idTask);
		if (!task) return;
		requestCompleteTask(idTask, task, setterDataTodos, setterSearchPhrase);
	};

	const handleSortList = () => {
		setIsSorted((prev) => !prev);
	};

	const clearSearch = () => {
		setIsSearchingMode(false);
		setterSearchPhrase('');
	};
	const onClickSearchBtn = () => {
		setIsOpenSearch((prev) => !prev);
		setIsAddingTask(false);
		clearSearch();
	};

	const handleSearchTask = (searchPhrase) => {
		const trimmedPhrase = searchPhrase.trim();
		if (!trimmedPhrase) return;
		setIsSearchingMode(true);
		requestSearchTask(trimmedPhrase, setterSearchPhrase);
	};

	if (isLoadingJsonServer) {
		return <Loader />;
	}
	const renderTodos = isSearchingMode
		? dataTodos.filter((todo) => todo.title.toLowerCase().includes(searchPhrase.toLowerCase()))
		: dataTodos;

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
