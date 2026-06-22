/*=============== Служебные импорты ===============*/
import { useSelector, useDispatch } from 'react-redux';

/*=============== Стили и иконки ===============*/

/*=============== Подключение компонентов ===============*/
import { TodoItem } from './components/TodoItem/TodoItem';

/*=============== Утилиты и функции ===============*/
import { dataTodosSelector, openSearchSelector } from '../selectors';
import { updateTodo, deleteTodo } from '../../utils/api';

export const TodoListComponent = () => {
	const dispatch = useDispatch();
	const todoList = useSelector(dataTodosSelector);
	const isOpenSearch = useSelector(openSearchSelector);
	const searchPhrase = useSelector((state) => state.ui.searchPhrase);

	const onSubmitEditTask = (id, title) => dispatch(updateTodo({ id, payload: { title } }));
	const onCompleteTask = (task) => dispatch(updateTodo({ id: task.id, payload: { completed: !task.completed } }));
	const onDeleteTask = (id) => dispatch(deleteTodo({ id }));

	const renderTodos = isOpenSearch
		? todoList.filter((todo) => todo.title.toLowerCase().includes(searchPhrase.toLowerCase()))
		: todoList;

	return (
		<ul className="list">
			{renderTodos.length === 0 ? (
				<li className="list__empty">Список задач пуст</li>
			) : (
				renderTodos.map((task) => (
					<TodoItem
						key={task.id}
						task={task}
						onSubmitEditTask={onSubmitEditTask}
						onDeleteTask={onDeleteTask}
						onCompleteTask={onCompleteTask}
					/>
				))
			)}
		</ul>
	);
};
