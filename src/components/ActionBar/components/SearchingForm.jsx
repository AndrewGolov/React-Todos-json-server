import { useState, useRef } from 'react';
import { Field } from '../../Field/Field';

export const SearchingForm = ({ handleSearch, clearSearch }) => {
	const [searchvalue, setSearchValue] = useState('');

	const refSearchField = useRef(null);

	const onChangeSearchValue = ({ target }) => {
		const value = target.value;
		if (!value.trim()) {
			clearSearch();
			setSearchValue(value);
			return;
		}
		setSearchValue(value);
		handleSearch(value);
	};

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
