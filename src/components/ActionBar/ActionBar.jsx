import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';
import { Button } from '../Button/Button';
import { use } from 'react';
import { AddingFormComponent } from './components/AddingFormComponent.jsx';
import { SearchingFormComponent } from './components/SearchingFormComponent.jsx';
import { AppContext } from '../../context/AppContext';
import { ErrorComponent } from '../ErrorComponent.jsx';

export const ActionBar = () => {
	const { isAddingTask, onClickAddBtn, errorMessage, isOpenSearch, onClickSearchBtn, isSorted, handleSortList } =
		use(AppContext);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div>
				<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />
				<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />
				<Button type="button" text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />} onClick={handleSortList} />
			</div>

			<div>
				{isAddingTask && <AddingFormComponent />}
				{isOpenSearch && <SearchingFormComponent />}
				{errorMessage && <ErrorComponent errorMessage={errorMessage} />}
			</div>
		</div>
	);
};
