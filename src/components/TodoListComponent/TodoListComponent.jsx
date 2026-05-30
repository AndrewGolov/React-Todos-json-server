import { TodoItem } from '../TodoItem/TodoItem';
import { AppContext } from '../../context/AppContext';
import { use } from 'react';

export const TodoListComponent = () => {
	const { TodoList } = use(AppContext);
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
