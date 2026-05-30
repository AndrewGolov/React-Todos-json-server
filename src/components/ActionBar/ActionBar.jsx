import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';
import { Button } from '../Button/Button';
import { useEffect, useRef, use } from 'react';
import { AddingFormComponent } from './components/AddingFormComponent.jsx';
import { SearchingForm } from './components/SearchingForm';
import { AppContext } from '../../context/AppContext';
import { ErrorComponent } from '../ErrorComponent.jsx';

export const ActionBar = ({ isSorted, handleSortList, isSearching, onClickSearchBtn, handleSearch, clearSearch }) => {
	const { isAddingTask, onClickAddBtn, errorMessage } = use(AppContext);

	const refSearchField = useRef(null);

	useEffect(() => {
		if (isSearching) {
			refSearchField.current?.focus();
		}
	}, [isSearching]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div>
				<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />
				<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />
				<Button type="button" text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />} onClick={handleSortList} />
			</div>

			<div>
				{isAddingTask && <AddingFormComponent />}
				{isSearching && <SearchingForm handleSearch={handleSearch} clearSearch={clearSearch} />}
				{errorMessage && <ErrorComponent errorMessage={errorMessage} />}
			</div>
		</div>
	);
};
