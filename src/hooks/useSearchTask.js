import { useState } from 'react';
import { requestSearchTask } from '../requests';

export const useSearchTask = () => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isSearchingMode, setIsSearchingMode] = useState(false);

	const clearSearch = () => {
		setIsSearchingMode(false);
		setSearchPhrase('');
	};
	const onClickSearchBtn = () => {
		setIsOpenSearch((prev) => !prev);
		clearSearch();
	};
	const onCloseSearchForm = () => {
		setIsOpenSearch(false);
		clearSearch();
	};

	const handleSearchTask = (searchPhrase) => {
		const trimmedPhrase = searchPhrase.trim();
		if (!trimmedPhrase) return;
		setIsSearchingMode(true);
		requestSearchTask(trimmedPhrase, setSearchPhrase);
	};

	return {
		searchPhrase,
		isSearchingMode,
		clearSearch,
		onClickSearchBtn,
		handleSearchTask,
		isOpenSearch,
		onCloseSearchForm,
	};
};
