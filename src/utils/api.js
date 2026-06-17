import { TODOS_URL_JSON_SERVER } from '../constants/constants';

const request = (url, options = {}) =>
	fetch(url, options).then((response) => {
		if (!response.ok) {
			throw new Error(`Ошибка сервера ${response.status}`);
		}

		return response.json();
	});

export const createTask = ({ title = 'Новая задача...' }) =>
	request(TODOS_URL_JSON_SERVER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, completed: false }),
	});

const readTodos = ({ isSorted = false, id = '' } = {}) => {
	if (id) {
		return request(`${TODOS_URL_JSON_SERVER}/${id}`);
	} else {
		return isSorted ? request(`${TODOS_URL_JSON_SERVER}?_sort=title`) : request(TODOS_URL_JSON_SERVER);
	}
};

export const updateTask = (id, payload) =>
	request(`${TODOS_URL_JSON_SERVER}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

export const deleteTask = ({ idTask }) =>
	request(`${TODOS_URL_JSON_SERVER}/${idTask}`, {
		method: 'DELETE',
	});

export const searchTasks = (phrase) => {
	const normalizedPhrase = phrase.trim();
	return request(`${TODOS_URL_JSON_SERVER}?title:contains=${encodeURIComponent(normalizedPhrase)}`);
};
export const getData = (isSorted) => (dispatch) =>
	readTodos(isSorted)
		.then((dataRequest) => dispatch({ type: 'GET_DATA_TODOS', payload: dataRequest }))
		.catch((error) => dispatch({ type: 'ERROR_REQUEST', payload: error }));
