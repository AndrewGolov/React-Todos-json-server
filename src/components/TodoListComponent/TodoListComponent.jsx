import { TodoItem } from './components/TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import { dataTodosSelector } from '../selectors';

export const TodoListComponent = () => {
	const TodoList = useSelector(dataTodosSelector);
	return (
		<ul className="list">
			{TodoList.length === 0 ? (
				<li className="list__empty">Список задач пуст</li>
			) : (
				TodoList.map((task) => <TodoItem key={task.id} task={task} />)
			)}
		</ul>
	);
};
