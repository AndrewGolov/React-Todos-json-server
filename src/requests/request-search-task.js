import { searchTasks } from '../utils/api';

export const requestSearchTask = (searchPhrase, setSearchPhrase) => {
	searchTasks(searchPhrase)
		.then(() => setSearchPhrase(searchPhrase))
		.catch((error) => {
			console.error('Ошибка при поиске задач', error);

			setSearchPhrase('');
		});
};
