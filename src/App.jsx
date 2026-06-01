import './App.css';
import { useState } from 'react';
import { Loader, TodoListComponent, ActionBar } from './components';
import { AppContext } from './context/AppContext';
import { useGetDataTodos, useAddTodo, useSearchTask } from './hooks';
import { requestCompleteTask } from './requests';

export const App = () => {
	const [isSorted, setIsSorted] = useState(false);
	const { dataTodos, isLoadingJsonServer, setterDataTodos } = useGetDataTodos(isSorted);
	const { isAddingTask, errorMessage, onClickAddBtn, onSubmitAddTask, onCloseFormAdd } = useAddTodo(setterDataTodos);
	const {
		searchPhrase,
		isSearchingMode,
		clearSearch,
		onClickSearchBtn,
		handleSearchTask,
		isOpenSearch,
		onCloseSearchForm,
	} = useSearchTask();

	const handleOpenAddForm = () => {
		onClickAddBtn();
		clearSearch();
		onCloseSearchForm();
	};
	const handleOpenSearchForm = () => {
		handleSearchTask(searchPhrase);
		onClickSearchBtn();
		clearSearch();
		onCloseFormAdd();
	};

	const handleCompletedTask = (idTask) => {
		const task = dataTodos.find((todo) => todo.id === idTask);
		if (!task) return;
		requestCompleteTask(idTask, task, setterDataTodos);
	};

	const handleSortList = () => {
		setIsSorted((prev) => !prev);
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
				handleOpenAddForm,
				onSubmitAddTask,
				onCloseFormAdd,
				isAddingTask,
				errorMessage,
				handleOpenSearchForm,
				handleSearchTask,
				isOpenSearch,
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
