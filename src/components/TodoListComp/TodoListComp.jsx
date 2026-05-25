import { TodoItem } from '../TodoItem/TodoItem';

export const TodoListComp = ({ dataTodos, handleCompletedTask }) => (
	<ul className="list">
		{dataTodos.length === 0 ? (
			<div className="list__empty">Список задач пуст</div>
		) : (
			dataTodos.map((item) => (
				<div key={item.id}>
					<TodoItem item={item} handleCompletedTask={handleCompletedTask} />
				</div>
			))
		)}
	</ul>
);
