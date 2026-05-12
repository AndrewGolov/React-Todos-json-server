import { useState, useRef, useEffect } from 'react';
import style from './JsonTodoList.module.css';
import { Button, Field, TodoItem } from '../../components';
import { ImPlus, ImCross, ImList2, ImSortAlphaAsc, ImSearch } from 'react-icons/im';

export const JsonTodoListApp = ({
	dataArr,
	onSubmitAddTask,
	handleDeleteTask,
	handleCompletedTask,
	handleSortList,
	errorMessage,
	errorsSet,
	onDoubleClickEditTask,
	editTaskId,
	onSubmitEditTask,
	onCancelEditingTask,
	handleSearchTask,
	handleClearSearch,
}) => {
	const [newTask, setNewTask] = useState('');
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [needFindTask, setNeedFindTask] = useState('');
	const [stateSorting, setIsStateSorting] = useState(false);
	const [isSearchingTask, setIsSearchingTask] = useState(false);

	const refAddField = useRef(null);
	const refSearchField = useRef(null);

	const onClickAddBtn = () => {
		setIsAddingTask((prev) => !prev);
		setIsSearchingTask(false);
		setNewTask('');
		errorsSet();
	};

	const onClickSearchBtn = () => {
		setIsSearchingTask((prev) => !prev);
		setIsAddingTask(false);
		if (isSearchingTask) {
			handleClearSearch();
			setNeedFindTask('');
		}
	};

	useEffect(() => {
		if (isAddingTask) {
			refAddField.current?.focus();
		}
		if (isSearchingTask) {
			refSearchField.current?.focus();
		}
	}, [isAddingTask, isSearchingTask]);

	return (
		<div className={style['list__wrapper']}>
			<h4>Тудушка JSON Server</h4>
			<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />
			<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />
			<Button
				type="button"
				text={stateSorting ? <ImList2 /> : <ImSortAlphaAsc />}
				onClick={() => {
					handleSortList();
					setIsStateSorting((prev) => !prev);
				}}
			/>

			{isAddingTask && (
				<form
					onSubmit={(event) => {
						onSubmitAddTask({ event, newTask });
						setNewTask('');
					}}
				>
					<Field
						type="text"
						placeholder="Введите текст задачи"
						value={newTask}
						onChange={({ target }) => setNewTask(target.value)}
						inpRef={refAddField}
					/>

					{errorMessage && <span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>}
					<div>
						<Button type="submit" text="Добавить" className={style['list__submit-btn']} />
						<Button type="button" text="Отменить" onClick={onClickAddBtn} />
					</div>
				</form>
			)}

			{isSearchingTask && (
				<Field
					type="text"
					placeholder="Какую задачу ищем???"
					value={needFindTask || ''}
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

			<ul className={style['list']}>
				{dataArr.length === 0 ? (
					<div className={style['list__empty']}>Список задач пуст</div>
				) : (
					dataArr.map((item) => (
						<TodoItem
							key={item.id}
							item={item}
							handleDeleteTask={handleDeleteTask}
							handleCompletedTask={handleCompletedTask}
							onDoubleClickEditTask={onDoubleClickEditTask}
							editTaskId={editTaskId}
							onSubmitEditTask={onSubmitEditTask}
							onCancelEditingTask={onCancelEditingTask}
						/>
					))
				)}
			</ul>
		</div>
	);
};
