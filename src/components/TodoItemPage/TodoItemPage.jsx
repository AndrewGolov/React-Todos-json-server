import { Button } from '../Button/Button';
import { Loader } from '../loader/Loader';
import { ErrorComponent } from '../ErrorComponent';
import styles from './TodoItemPage.module.css';
import { useState } from 'react';
import { Field } from '../Field/Field';
import { ImBin, ImPencil, ImCheckmark, ImCross } from 'react-icons/im';

import { readTodos, updateTask, deleteTask } from '../../utils/api';

export const TodoItemPage = () => {
	const [task, setTask] = useState(null);

	const [newTitle, setNewTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);

	const onClickEditTask = () => {
		setIsEditing(true);
		setNewTitle(task.title);
	};

	const onSubmitEditTask = (e) => {
		e.preventDefault();
		const trimmedTitle = newTitle.trim();
		if (!trimmedTitle) return;
		setIsSubmitting(true);

		updateTask(id, {
			title: trimmedTitle,
		})
			.then(() => {
				setTask((prev) => ({ ...prev, title: trimmedTitle }));
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
		deleteTask({ idTask: id })
			.then(() => {
				console.log('Задача успешно удалена');
			})
			.catch((error) => console.log('Ошибка запроса ...', error));
	};

	if (isNotFound) {
		return <ErrorComponent />;
	}

	if (!task) {
		return <Loader />;
	}

	return (
		<div className={styles['TaskPage__container']}>
			<div className={styles['TaskPage__header']}>
				<Button type="button" onClick={onClickEditTask} text={<ImPencil />} disabled={isEditing} />
				<Button type="button" text={<ImBin />} onClick={handleDeleteTask} />
			</div>
			<div className={styles['TaskPage__content']}>
				<div className={styles['TaskPage__header-content']}>
					{!isEditing ? (
						<div className={styles['list__item-title']}>
							<h5 className={styles['TaskPage__title']}>{task.title}</h5>
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
				</div>
			</div>
		</div>
	);
};
