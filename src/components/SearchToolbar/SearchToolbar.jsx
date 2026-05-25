import { useState, useRef, useEffect } from 'react';
import { Field } from '../Field/Field';

export const SearchToolbar = ({ isOpenSearch, handleSearch, clearSearch }) => {
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

	useEffect(() => {
		if (isOpenSearch) {
			refSearchField.current?.focus();
		}
	}, [isOpenSearch]);

	return (
		<>
			{isOpenSearch && (
				<Field
					type="text"
					placeholder="Какую задачу ищем?"
					value={searchvalue}
					onChange={onChangeSearchValue}
					inpRef={refSearchField}
				/>
			)}
		</>
	);
};
