import { useState } from 'react';
import { Button, Field } from '../../components';
import style from './TodoItem.module.css';

import { ImBin, ImCheckmark, ImCheckmark2, ImCross } from 'react-icons/im';

export const TodoItem = ({
	item,
	handleDeleteTask,
	handleCompletedTask,
	onDoubleClickEditTask,
	editTaskId,
	onSubmitEditTask,
	onCancelEditingTask,
}) => {
	const [editTaskValue, setEditTaskValue] = useState(item.title);

	return (
		<>
			<li
				key={item.id}
				className={
					item.completed ? `${style['list__item']} ${style['list__item-completed']}` : style['list__item']
				}
			>
				{editTaskId !== item.id ? (
					<div onDoubleClick={() => onDoubleClickEditTask(item.id)}>{item.title}</div>
				) : (
					<form
						onSubmit={(e) => {
							onSubmitEditTask({ e, editTaskValue });
						}}
					>
						<div className={style['list__item-formEditing-wrapper']}>
							<Field
								type="text"
								placeholder="введите новый текст задачи"
								value={editTaskValue}
								onChange={({ target }) => setEditTaskValue(target.value)}
							/>
							<Button type="submit" text={<ImCheckmark />} className={style['list__item-submitBtn']} />
							<Button
								type="button"
								text={<ImCross />}
								onClick={() => onCancelEditingTask()}
								className={style['list__item-cancelBtn']}
							/>
						</div>
					</form>
				)}

				<div>
					<Button
						text={
							!item.completed ? (
								<ImCheckmark2 />
							) : (
								<span style={{ color: 'green', fontSize: '16px', fontWeight: '500' }}>
									<ImCheckmark />
								</span>
							)
						}
						type="button"
						onClick={() => handleCompletedTask(item.id)}
					/>
					<Button type="button" text={<ImBin />} onClick={() => handleDeleteTask(item.id)} />
				</div>
			</li>
		</>
	);
};
