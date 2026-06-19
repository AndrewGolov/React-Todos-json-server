import './App.css';
import { Loader, TodoListComponent, ActionBar } from './components';

import { useGetDataTodos, useSearchTask } from './hooks';
import { requestCompleteTask } from './requests';
import { useSelector } from 'react-redux';
import { loadingDataSelector, isSortedSelector } from './components/selectors';

export const App = () => {
	const isLoadingJsonServer = useSelector(loadingDataSelector);
	const isSorted = useSelector(isSortedSelector);

	const { todos: dataTodos } = useGetDataTodos(isSorted);

	const {
		searchPhrase,

		clearSearch,
		onClickSearchBtn,
		handleSearchTask,

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
		requestCompleteTask(idTask, task);
	};

	if (isLoadingJsonServer) {
		return <Loader />;
	}
	// const renderTodos = isSearchingMode
	// 	? dataTodos.filter((todo) => todo.title.toLowerCase().includes(searchPhrase.toLowerCase()))
	// 	: dataTodos;

	return (
		/*
			value={{
				TodoList: renderTodos,

				handleOpenAddForm,
				onSubmitAddTask,
				onCloseFormAdd,
				errorMessage,
				handleOpenSearchForm,
				handleSearchTask,
				isOpenSearch,
				clearSearch,
				isSorted,

				handleCompletedTask,
			}}
		*/
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
