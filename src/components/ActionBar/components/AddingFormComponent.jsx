/*=============== Служебные импорты ===============*/
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

/*=============== Стили и иконки ===============*/

/*=============== Подключение компонентов ===============*/
import { Button } from '../../Button/Button';
import { Field } from '../../Field/Field';
import { ErrorComponent } from '../../ErrorComponent';

/*=============== Утилиты и функции ===============*/
import { addingTaskSelector } from '../../selectors';

export const AddingFormComponent = ({ cancelAddingMode, submitAddingTask }) => {
	const isAddingTask = useSelector(addingTaskSelector);

	const [newValue, setNewValue] = useState('');
	const [error, setError] = useState('');
	const refAddField = useRef(null);

	const submitForm = (event) => {
		event.preventDefault();
		const validValue = newValue.replace(/\s+/g, ' ').trim();
		if (!validValue) return setError('Поле не должно быть пустым');
		submitAddingTask(validValue);
		setNewValue('');
		setError('');
	};
	const cancelMode = () => {
		cancelAddingMode();
		setNewValue('');
	};

	useEffect(() => {
		if (isAddingTask) {
			refAddField.current?.focus();
		}
	}, [isAddingTask]);

	return (
		<>
			{isAddingTask && (
				<form onSubmit={submitForm}>
					<div style={{ display: 'flex', alignItems: 'baseline' }}>
						<div style={{ flexGrow: '1' }}>
							<Field
								type="text"
								placeholder="Введите текст задачи"
								value={newValue}
								onChange={({ target }) => setNewValue(target.value)}
								inpRef={refAddField}
							/>
							{error && <ErrorComponent errorMessage={error} />}
						</div>

						<div>
							<Button type="submit" text="Добавить" />
							<Button type="button" text="Отменить" onClick={cancelMode} />
						</div>
					</div>
				</form>
			)}
		</>
	);
};
