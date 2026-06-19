/*=============== Служебные импорты ===============*/
import { useSelector, useDispatch } from 'react-redux';

/*=============== Стили и иконки ===============*/
import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';

/*=============== Подключение компонентов ===============*/
import { Button } from '../Button/Button';
import { AddingFormComponent } from './components/AddingFormComponent';
import { SearchingFormComponent } from './components/SearchingFormComponent';

/*=============== Утилиты и функции ===============*/
import { addingTaskSelector, isSortedSelector, openSearchSelector } from '../selectors';

export const ActionBar = () => {
	const dispatch = useDispatch();
	const isAddingTask = useSelector(addingTaskSelector);
	const isOpenSearch = useSelector(openSearchSelector);
	const isSorted = useSelector(isSortedSelector);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
			<div>
				<Button
					type="button"
					text={!isAddingTask ? <ImPlus /> : <ImCross />}
					onClick={() => dispatch({ type: 'ADDING_MODE' })}
				/>
				<Button type="button" text={<ImSearch />} onClick={() => console.log('КЛик открыть поле поиска')} />
				<Button
					type="button"
					text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />}
					onClick={() => dispatch({ type: 'ACTION_SORTED' })}
				/>
			</div>

			<div style={{ flexGrow: 1 }}>
				{isAddingTask && <AddingFormComponent />}
				{isOpenSearch && <SearchingFormComponent />}
			</div>
		</div>
	);
};
