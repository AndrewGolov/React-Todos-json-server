import { TodoItem } from '../TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import { dataTodosSelector } from '../selectors';

export const TodoListComponent = () => {
	const TodoList = useSelector(dataTodosSelector);
	return (
		<ul className="list">
			{TodoList.length === 0 ? (
				<div className="list__empty">Список задач пуст</div>
			) : (
				TodoList.map((item) => (
					<div key={item.id}>
						<TodoItem id={item.id} />
					</div>
				))
			)}
		</ul>
	);
};
