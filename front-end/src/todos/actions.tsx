import { Todo } from './types';

// Action Type Constants
export const NEW_TODO_TITLE_CHANGE = 'NEW_TODO_TITLE_CHANGE';
export const FETCH_ALL_TODOS = 'FETCH_ALL_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO_COMPLETED = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SHOW_DELETE_CONFIRMATION = 'SHOW_DELETE_CONFIRMATION';
export const HIDE_DELETE_CONFIRMATION = 'HIDE_DELETE_CONFIRMATION';

export type Action =
    | { type: typeof NEW_TODO_TITLE_CHANGE; payload: string }
    | { type: typeof FETCH_ALL_TODOS; payload: Todo[] }
    | { type: typeof ADD_TODO; payload: Todo }
    | { type: typeof TOGGLE_TODO_COMPLETED; payload: { id: number; completed: boolean } }
    | { type: typeof REMOVE_TODO; payload: number }
    | { type: typeof SHOW_DELETE_CONFIRMATION; payload: number }
    | { type: typeof HIDE_DELETE_CONFIRMATION };

// Action Creators
export const changeTitle = (title: string): Action => ({ type: NEW_TODO_TITLE_CHANGE, payload: title });
export const fetchAll = (items: Todo[]): Action => ({ type: FETCH_ALL_TODOS, payload: items });
export const add = (item: Todo): Action => ({ type: ADD_TODO, payload: item });
export const toggleComplete = (id: number, completed: boolean): Action => ({ type: TOGGLE_TODO_COMPLETED, payload: { id, completed } });
export const remove = (id: number): Action => ({ type: REMOVE_TODO, payload: id });
export const showDeleteConfirmation = (id: number): Action => ({ type: SHOW_DELETE_CONFIRMATION, payload: id });
export const hideDeleteConfirmation = (): Action => ({ type: HIDE_DELETE_CONFIRMATION });
