/*=============== Служебные импорты ===============*/
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/*=============== Стили и иконки ===============*/

/*=============== Подключение компонентов ===============*/
import { Button } from '../../Button/Button';
import { Field } from '../../Field/Field';
import { ErrorComponent } from '../../ErrorComponent';

/*=============== Утилиты и функции ===============*/
import { addingTaskSelector } from '../../selectors';
import { createTodo } from '../../../utils/api';
import { actions } from '../../../actions/actions';

export const AddingFormComponent = () => {
	const dispatch = useDispatch();
	const isAddingTask = useSelector(addingTaskSelector);

	const [newValue, setNewValue] = useState('');
	const [error, setError] = useState('');
	const refAddField = useRef(null);

	const submitForm = (event) => {
		event.preventDefault();
		if (!newValue.trim()) return setError('Поле не должно быть пустым');

		dispatch(createTodo(newValue));

		setNewValue('');
		setError('');
	};
	const cancelAddingMode = () => {
		setNewValue('');
		dispatch({ type: actions.ADDING_MODE, payload: false });
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
							<Button type="button" text="Отменить" onClick={cancelAddingMode} />
						</div>
					</div>
				</form>
			)}
		</>
	);
};
