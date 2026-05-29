import { useState, useRef } from 'react';
import { Button } from '../../Button/Button';
import { Field } from '../../Field/Field';

export const AddingForm = ({ onSubmit, onToggle, isOpen, errorMessage }) => {
	const [newValue, setNewValue] = useState('');
	const refAddField = useRef(null);

	return (
		<>
			{isOpen && (
				<form
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit({ value: newValue });
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

					{errorMessage && <span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>}

					<div>
						<Button type="submit" text="Добавить" />

						<Button
							type="button"
							text="Отменить"
							onClick={() => {
								onToggle();
								setNewValue('');
							}}
						/>
					</div>
				</form>
			)}
		</>
	);
};
