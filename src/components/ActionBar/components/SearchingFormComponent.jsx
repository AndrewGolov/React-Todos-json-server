import { useState, useRef, useEffect } from 'react';
import { Field } from '../../Field/Field';
import { useSelector } from 'react-redux';
import { openSearchSelector } from '../../selectors';

export const SearchingFormComponent = ({ searchTask }) => {
	const isOpenSearch = useSelector(openSearchSelector);
	const [searchValue, setSearchValue] = useState('');

	const refSearchField = useRef(null);
	useEffect(() => {
		if (isOpenSearch) {
			refSearchField.current?.focus();
		}
	}, [isOpenSearch]);

	const onChangeSearchValue = ({ target }) => {
		const value = target.value;
		if (!value.trim()) {
			setSearchValue(value);
			return;
		} else {
			setSearchValue(value);

			searchTask(value);
		}
	};

	return (
		<>
			<Field
				type="text"
				placeholder="Какую задачу ищем?"
				value={searchValue}
				onChange={onChangeSearchValue}
				inpRef={refSearchField}
			/>
		</>
	);
};
