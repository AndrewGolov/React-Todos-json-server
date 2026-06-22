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
import { actions } from '../../actions/actions';
import { createTodo } from '../../utils/api';

export const ActionBar = () => {
	const dispatch = useDispatch();
	const isAddingTask = useSelector(addingTaskSelector);
	const isOpenSearch = useSelector(openSearchSelector);
	const isSorted = useSelector(isSortedSelector);

	const cancelAddingMode = () => dispatch({ type: actions.ADDING_MODE, payload: false });
	const submitAddingTask = (textTask) => dispatch(createTodo(textTask));

	const searchTask = (phrase) => dispatch({ type: actions.SET_SEARCH_PHRASE, payload: phrase });

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
			<div>
				<Button
					type="button"
					text={!isAddingTask ? <ImPlus /> : <ImCross />}
					onClick={() => dispatch({ type: actions.ADDING_MODE })}
				/>
				<Button
					type="button"
					text={<ImSearch />}
					onClick={() => dispatch({ type: actions.OPEN_SEARCH_MODE })}
				/>
				<Button
					type="button"
					text={isSorted ? <ImList2 /> : <ImSortAlphaAsc />}
					onClick={() => dispatch({ type: actions.ACTION_SORTED })}
				/>
			</div>

			<div>
				{isAddingTask && (
					<AddingFormComponent cancelAddingMode={cancelAddingMode} submitAddingTask={submitAddingTask} />
				)}
				{isOpenSearch && <SearchingFormComponent searchTask={searchTask} />}
			</div>
		</div>
	);
};
