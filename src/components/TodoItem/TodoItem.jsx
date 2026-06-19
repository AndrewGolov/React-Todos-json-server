/*=============== Служебные импорты ===============*/
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

/*=============== Стили и иконки ===============*/
import styles from './TodoItem.module.css';
import { ImCheckmark2, ImBin, ImPencil, ImCheckmark, ImCross } from 'react-icons/im';

/*=============== Подключение компонентов ===============*/
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';

/*=============== Утилиты и функции ===============*/
import { updateTask, deleteTask } from '../../utils/api';
import { dataTodosSelector } from '../selectors';

export const TodoItem = ({ id }) => {
	const TodoList = useSelector(dataTodosSelector);
	const [newTitle, setNewTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const Task = TodoList.find((task) => task.id === id);
	const editRef = useRef(null);

	const onClickEditTask = () => {
		setIsEditing(true);
		setNewTitle(Task.title);
	};

	const onSubmitEditTask = (e) => {
		e.preventDefault();
		const trimmedTitle = newTitle.trim();
		if (!trimmedTitle) return;
		setIsSubmitting(true);

		updateTask(Task.id, {
			title: trimmedTitle,
		})
			.then(() => {
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

	const handleDeleteTask = () => {
		deleteTask({ idTask: Task.id })
			.then(() => {
				console.log('Задача успешно удалена');
			})
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	useEffect(() => {
		if (isEditing) {
			editRef.current?.focus();
		}
	}, [isEditing]);

	return (
		<>
			<li
				className={
					Task.completed ? `${styles['list__item']} ${styles['list__item-completed']}` : styles['list__item']
				}
			>
				{!isEditing ? (
					<div className={styles['list__item-title']}>
						<h5 className={styles['TaskPage__title']}>{Task.title}</h5>
					</div>
				) : (
					<form onSubmit={onSubmitEditTask}>
						<div className={styles['list__item-formEditing-wrapper']}>
							<Field
								type="text"
								placeholder="введите новый текст задачи"
								value={newTitle}
								onChange={({ target }) => setNewTitle(target.value)}
								inpRef={editRef}
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
							!Task.completed ? (
								<ImCheckmark2 />
							) : (
								<span style={{ color: 'green', fontSize: '16px', fontWeight: '500' }}>
									<ImCheckmark />
								</span>
							)
						}
						type="button"
						// onClick={handleCompletedTask.bind(null, Task.id)}
					/>
					<Button type="button" onClick={onClickEditTask} text={<ImPencil />} disabled={isEditing} />
					<Button type="button" text={<ImBin />} onClick={handleDeleteTask} />
				</div>
			</li>
		</>
	);
};
