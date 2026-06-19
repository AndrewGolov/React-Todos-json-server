import { TodoItem } from './components/TodoItem/TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { dataTodosSelector } from '../selectors';

import { updateTodo, deleteTodo } from '../../utils/api';

export const TodoListComponent = () => {
	const dispatch = useDispatch();
	const TodoList = useSelector(dataTodosSelector);

	const onSubmitEditTask = (id, title) => dispatch(updateTodo({ id, payload: { title } }));
	const onCompleteTask = (task) => dispatch(updateTodo({ id: task.id, payload: { completed: !task.completed } }));
	const onDeleteTask = (id) => dispatch(deleteTodo({ id }));

	return (
		<ul className="list">
			{TodoList.length === 0 ? (
				<li className="list__empty">Список задач пуст</li>
			) : (
				TodoList.map((task) => (
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
