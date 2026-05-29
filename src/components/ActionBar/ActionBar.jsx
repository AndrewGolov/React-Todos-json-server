import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';
import { Button } from '../Button/Button';

export const ActionBar = ({ onClickAddBtn, isAddingTask, onToggleSearch, isOpenSearch }) => {
	return (
		<>
			<Button type="button" text={!isAddingTask ? <ImPlus /> : <ImCross />} onClick={onClickAddBtn} />
			<Button type="button" text={<ImSearch />} onClick={onClickSearchBtn} />
			<Button type="button" text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />} onClick={handleSortList} />
		</>
	);
};
