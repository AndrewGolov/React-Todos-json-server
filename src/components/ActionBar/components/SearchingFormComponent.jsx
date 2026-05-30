import { useState, useRef, use, useEffect } from 'react';
import { Field } from '../../Field/Field';
import { AppContext } from '../../../context/AppContext';

export const SearchingFormComponent = () => {
	const { handleSearchTask, isOpenSearch, clearSearch } = use(AppContext);
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
		handleSearchTask(value);
	};
	useEffect(() => {
		if (isOpenSearch) {
			refSearchField.current?.focus();
		}
	}, [isOpenSearch]);

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
