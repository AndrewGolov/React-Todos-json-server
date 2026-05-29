import { useState } from 'react';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import styles from './TodoItem.module.css';
import { ImCheckmark2, ImBin, ImPencil, ImCheckmark, ImCross } from 'react-icons/im';
import { updateTask, deleteTask } from '../../utils/api';

export const TodoItem = ({ item, handleCompletedTask }) => {
	const [newTitle, setNewTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onClickEditTask = () => {
		setIsEditing(true);
		setNewTitle(item.title);
	};

	const onSubmitEditTask = (e) => {
		e.preventDefault();
		const trimmedTitle = newTitle.trim();
		if (!trimmedTitle) return;
		setIsSubmitting(true);

		updateTask(item.id, {
			title: trimmedTitle,
		})
			.then(() => {
				// setTask((prev) => ({ ...prev, title: trimmedTitle }));
				setIsEditing(false);
				setNewTitle('');
			})
			.catch((error) => {
				console.log('Ошибка изменения данных', error);
			})

			.finally(() => {
				setIsSubmitting(false);
			});
	};

	/* ====================== DELETE TASK ====================== */

	const handleDeleteTask = () => {
		deleteTask({ idTask: item.id })
			.then(() => {
				console.log('Задача успешно удалена');
			})
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	return (
		<>
			<li
				className={
					item.completed ? `${styles['list__item']} ${styles['list__item-completed']}` : styles['list__item']
				}
			>
				{!isEditing ? (
					<div className={styles['list__item-title']}>
						<h5 className={styles['TaskPage__title']}>{item.title}</h5>
					</div>
				) : (
					<form onSubmit={onSubmitEditTask}>
						<div className={styles['list__item-formEditing-wrapper']}>
							<Field
								type="text"
								placeholder="введите новый текст задачи"
								value={newTitle}
								onChange={({ target }) => setNewTitle(target.value)}
							/>
							<Button
								type="submit"
								text={<ImCheckmark />}
								className={styles['list__item-submitBtn']}
								disabled={isSubmitting || !newTitle.trim()}
							/>
							<Button
								type="button"
								text={<ImCross />}
								onClick={() => setIsEditing(false)}
								className={styles['list__item-cancelBtn']}
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
						onClick={handleCompletedTask.bind(null, item.id)}
					/>
					<Button type="button" onClick={onClickEditTask} text={<ImPencil />} disabled={isEditing} />
					<Button type="button" text={<ImBin />} onClick={handleDeleteTask} />
				</div>
			</li>
		</>
	);
};
