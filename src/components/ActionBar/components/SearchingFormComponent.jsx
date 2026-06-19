import { useState, useRef, useEffect } from 'react';
import { Field } from '../../Field/Field';

export const SearchingFormComponent = () => {
	const [searchvalue, setSearchValue] = useState('');

	const refSearchField = useRef(null);

	const onChangeSearchValue = ({ target }) => {
		const value = target.value;
		if (!value.trim()) {
			setSearchValue(value);
			return;
		}
		setSearchValue(value);
	};
	// useEffect(() => {
	// 	if (isOpenSearch) {
	// 		refSearchField.current?.focus();
	// 	}
	// }, [isOpenSearch]);

	return (
		<>
			<Field
				type="text"
				placeholder="Какую задачу ищем?"
				value={searchvalue}
				onChange={onChangeSearchValue}
				inpRef={refSearchField}
			/>
		</>
	);
};
