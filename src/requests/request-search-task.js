import { searchTasks } from '../utils/api';

export const requestSearchTask = (searchPhrase, setterSearchPhrase) => {
	searchTasks(searchPhrase)
		.then(() => setterSearchPhrase(searchPhrase))
		.catch((error) => {
			console.error('Ошибка при поиске задач', error);

			setterSearchPhrase('');
		});
};
