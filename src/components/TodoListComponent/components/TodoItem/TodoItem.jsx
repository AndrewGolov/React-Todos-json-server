/*=============== Служебные импорты ===============*/
import { useState, useRef, useEffect } from 'react';

/*=============== Стили и иконки ===============*/
import styles from './TodoItem.module.css';
import { ImCheckmark2, ImBin, ImPencil, ImCheckmark, ImCross } from 'react-icons/im';

/*=============== Подключение компонентов ===============*/
import { Button } from '../../../../components';
import { Field } from '../../../../components';

/*=============== Утилиты и функции ===============*/

export const TodoItem = ({ task, onSubmitEditTask, onDeleteTask, onCompleteTask }) => {
	const [newTitle, setNewTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const editRef = useRef(null);

	useEffect(() => {
		if (isEditing) {
			editRef.current?.focus();
		}
	}, [isEditing]);

	if (!task) return null;

	const onChange = ({ target }) => setNewTitle(target.value);

	const openEdit = () => {
		setIsEditing(true);
		setNewTitle(task.title);
	};
	const cancelEdit = () => setIsEditing(false);
	const submitForm = async (e) => {
		e.preventDefault();
		const title = newTitle.trim();
		if (!title) return;
		onSubmitEditTask(task.id, title);
		cancelEdit();
	};

	return (
		<li
			className={
				task.completed ? `${styles['list__item']} ${styles['list__item-completed']}` : styles['list__item']
			}
		>
			{!isEditing ? (
				<div className={styles['list__item-title']}>
					<h5 className={styles['TaskPage__title']}>{task.title}</h5>
				</div>
			) : (
				<form onSubmit={submitForm}>
					<div className={styles['list__item-formEditing-wrapper']}>
						<Field
							type="text"
							placeholder="введите новый текст задачи"
							value={newTitle}
							onChange={onChange}
							inpRef={editRef}
						/>
						<Button
							type="submit"
							text={<ImCheckmark />}
							className={styles['list__item-submitBtn']}
							disabled={!newTitle.trim()}
						/>
						<Button
							type="button"
							text={<ImCross />}
							onClick={cancelEdit}
							className={styles['list__item-cancelBtn']}
						/>
					</div>
				</form>
			)}

			<div>
				<Button
					text={
						!task.completed ? (
							<ImCheckmark2 />
						) : (
							<span style={{ color: 'green', fontSize: '16px', fontWeight: '500' }}>
								<ImCheckmark />
							</span>
						)
					}
					type="button"
					onClick={() => onCompleteTask(task)}
				/>
				<Button type="button" onClick={openEdit} text={<ImPencil />} disabled={isEditing} />
				<Button type="button" text={<ImBin />} onClick={() => onDeleteTask(task.id)} />
			</div>
		</li>
	);
};
