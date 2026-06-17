/*=============== Служебные импорты ===============*/
import { useSelector, useDispatch } from 'react-redux';

/*=============== Стили и иконки ===============*/
import { ImPlus, ImCross, ImSearch, ImList2, ImSortAlphaAsc } from 'react-icons/im';

/*=============== Подключение компонентов ===============*/
import { ErrorComponent } from '../ErrorComponent.jsx';
import { Button } from '../Button/Button';

/*=============== Утилиты и функции ===============*/
import { AddingFormComponent, SearchingFormComponent } from './components';
import { addingTaskSelector, isSortedSelector, openSearchSelector, errorFieldMessageSelector } from '../selectors';

export const ActionBar = () => {
	const dispatch = useDispatch();
	const isAddingTask = useSelector(addingTaskSelector);
	const isOpenSearch = useSelector(openSearchSelector);
	const isSorted = useSelector(isSortedSelector);
	const errorMessage = useSelector(errorFieldMessageSelector);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div>
				<Button
					type="button"
					text={!isAddingTask ? <ImPlus /> : <ImCross />}
					onClick={() => console.log('Клик добавить задачу')}
				/>
				<Button type="button" text={<ImSearch />} onClick={() => console.log('КЛик открыть поле поиска')} />
				<Button
					type="button"
					text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />}
					onClick={() => dispatch({ type: 'ACTION_SORTED' })}
				/>
			</div>

			<div>
				{isAddingTask && <AddingFormComponent />}
				{isOpenSearch && <SearchingFormComponent />}
				{errorMessage && <ErrorComponent errorMessage={errorMessage} />}
			</div>
		</div>
	);
};
