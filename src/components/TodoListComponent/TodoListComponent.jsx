import { TodoItem } from '../TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import { dataTodos } from '../selectors/dataTodos.js';

export const TodoListComponent = () => {
	const TodoList = useSelector(dataTodos);
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
