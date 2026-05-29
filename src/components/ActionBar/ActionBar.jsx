import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';
import { Button } from '../Button/Button';
import { useEffect, useRef } from 'react';
import { AddingForm } from './components/AddingForm';
import { SearchingForm } from './components/SearchingForm';

export const ActionBar = ({
	onClickAddBtn,
	isAddingTask,
	isSorted,
	handleSortList,
	onSubmitAddTask,
	errorMessage,
	isSearching,
	onClickSearchBtn,
	handleSearch,
	clearSearch,
}) => {
	const refAddField = useRef(null);
	const refSearchField = useRef(null);

	useEffect(() => {
		if (isSearching) {
			refSearchField.current?.focus();
		}
		if (isAddingTask) {
			refAddField.current?.focus();
		}
	}, [isAddingTask, isSearching]);
	return (
		<>
			<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />
			<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />
			<Button type="button" text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />} onClick={handleSortList} />
			<div>
				{isAddingTask && (
					<AddingForm
						onSubmit={onSubmitAddTask}
						isOpen={isAddingTask}
						onToggle={onClickAddBtn}
						errorMessage={errorMessage}
					/>
				)}
				{isSearching && <SearchingForm handleSearch={handleSearch} clearSearch={clearSearch} />}

				<SearchingForm handleSearch={handleSearch} clearSearch={clearSearch} />
			</div>
		</>
	);
};
