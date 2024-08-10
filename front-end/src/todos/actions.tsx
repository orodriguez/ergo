import { Todo } from './types';

// Action Type Constants
export const NEW_TODO_TITLE_CHANGE = 'NEW_TODO_TITLE_CHANGE';
export const SET_ITEMS = 'SET_ITEMS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SHOW_DELETE_CONFIRMATION = 'SHOW_DELETE_CONFIRMATION';
export const HIDE_DELETE_CONFIRMATION = 'HIDE_DELETE_CONFIRMATION';

export type Action =
    | { type: typeof NEW_TODO_TITLE_CHANGE; payload: string }
    | { type: typeof SET_ITEMS; payload: Todo[] }
    | { type: typeof ADD_TODO; payload: Todo }
    | { type: typeof UPDATE_ITEM; payload: { id: number; completed: boolean } }
    | { type: typeof REMOVE_ITEM; payload: number }
    | { type: typeof SHOW_DELETE_CONFIRMATION; payload: number }
    | { type: typeof HIDE_DELETE_CONFIRMATION };

// Action Creators
export const changeTitle = (title: string): Action => ({ type: NEW_TODO_TITLE_CHANGE, payload: title });
export const fetchAll = (items: Todo[]): Action => ({ type: SET_ITEMS, payload: items });
export const add = (item: Todo): Action => ({ type: ADD_TODO, payload: item });
export const update = (id: number, completed: boolean): Action => ({ type: UPDATE_ITEM, payload: { id, completed } });
export const remove = (id: number): Action => ({ type: REMOVE_ITEM, payload: id });
export const showDeleteConfirmation = (id: number): Action => ({ type: SHOW_DELETE_CONFIRMATION, payload: id });
export const hideDeleteConfirmation = (): Action => ({ type: HIDE_DELETE_CONFIRMATION });
