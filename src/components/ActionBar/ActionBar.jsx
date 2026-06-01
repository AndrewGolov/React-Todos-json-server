import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';
import { Button } from '../Button/Button';
import { use } from 'react';
import { AddingFormComponent, SearchingFormComponent } from './components';
import { AppContext } from '../../context/AppContext';
import { ErrorComponent } from '../ErrorComponent.jsx';

export const ActionBar = () => {
	const {
		isAddingTask,
		handleOpenAddForm,
		errorMessage,
		isOpenSearch,
		handleOpenSearchForm,
		isSorted,
		handleSortList,
	} = use(AppContext);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div>
				<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={handleOpenAddForm} />
				<Button type="button" text={<ImSearch />} onClick={handleOpenSearchForm} />
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
