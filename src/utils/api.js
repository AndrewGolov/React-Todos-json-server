import { TODOS_URL_JSON_SERVER } from '../constants/constants';
import { actions } from '../actions/actions';

const request = (url, options = {}) =>
	fetch(url, options).then((response) => {
		if (!response.ok) {
			throw new Error(`Ошибка сервера ${response.status}`);
		}

		return response.json();
	});

const readTodos = ({ isSorted = false, id = '' } = {}) => {
	if (id) {
		return request(`${TODOS_URL_JSON_SERVER}/${id}`);
	} else {
		return isSorted ? request(`${TODOS_URL_JSON_SERVER}?_sort=title`) : request(TODOS_URL_JSON_SERVER);
	}
};

const newTaskRequest = (title = 'Новая задача...') =>
	request(TODOS_URL_JSON_SERVER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, completed: false }),
	});

const updateTask = (id, payload) =>
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

/*================ REDUX ФУНКЦИИ ================*/

export const createTodo = (title) => (dispatch) =>
	newTaskRequest(title)
		.then((newTask) => dispatch({ type: actions.ADD_NEW_TASK, payload: newTask }))
		.catch((error) => dispatch({ type: actions.ERROR_REQUEST, payload: error }));

export const getData = (isSorted) => (dispatch) =>
	readTodos(isSorted)
		.then((dataRequest) => dispatch({ type: actions.GET_DATA_TODOS, payload: dataRequest }))
		.catch((error) => dispatch({ type: actions.ERROR_REQUEST, payload: error }));
export const updateTodo = (id, payload) => (dispatch) =>
	updateTask(id, payload).then((updatedData) => dispatch({ type: actions.UPDATE_TASK, payload: updatedData }));
