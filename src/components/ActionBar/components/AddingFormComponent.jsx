import { useState, useRef } from 'react';
import { Button } from '../../Button/Button';
import { Field } from '../../Field/Field';
import { use, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';

export const AddingFormComponent = () => {
	const { onSubmitAddTask, isAddingTask, onClickAddBtn } = use(AppContext);
	const [newValue, setNewValue] = useState('');
	const refAddField = useRef(null);

	useEffect(() => {
		if (isAddingTask) {
			refAddField.current?.focus();
		}
	}, [isAddingTask]);

	return (
		<>
			{isAddingTask && (
				<form
					onSubmit={(event) => {
						event.preventDefault();
						onSubmitAddTask({ value: newValue });
						setNewValue('');
					}}
				>
					<Field
						type="text"
						placeholder="Введите текст задачи"
						value={newValue}
						onChange={({ target }) => setNewValue(target.value)}
						inpRef={refAddField}
					/>

					<div>
						<Button type="submit" text="Добавить" />

						<Button
							type="button"
							text="Отменить"
							onClick={() => {
								onClickAddBtn();
								setNewValue('');
							}}
						/>
					</div>
				</form>
			)}
		</>
	);
};
