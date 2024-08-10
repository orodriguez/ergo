import { Todo } from './types';

// Action Type Constants
export const SET_NEW_TODO_TITLE = 'SET_NEW_TODO_TITLE';
export const SET_ACTIVE_REQUESTS = 'SET_ACTIVE_REQUESTS';
export const SET_ITEMS = 'SET_ITEMS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SHOW_DELETE_CONFIRMATION = 'SHOW_DELETE_CONFIRMATION';
export const HIDE_DELETE_CONFIRMATION = 'HIDE_DELETE_CONFIRMATION';

export type Action =
    | { type: typeof SET_NEW_TODO_TITLE; payload: string }
    | { type: typeof SET_ACTIVE_REQUESTS; payload: number }
    | { type: typeof SET_ITEMS; payload: Todo[] }
    | { type: typeof ADD_TODO; payload: Todo }
    | { type: typeof UPDATE_ITEM; payload: { id: number; completed: boolean } }
    | { type: typeof REMOVE_ITEM; payload: number }
    | { type: typeof SHOW_DELETE_CONFIRMATION; payload: number }
    | { type: typeof HIDE_DELETE_CONFIRMATION };

// Action Creators
export const changeTitle = (title: string): Action => ({ type: SET_NEW_TODO_TITLE, payload: title });
export const setActiveRequests = (count: number): Action => ({ type: SET_ACTIVE_REQUESTS, payload: count });
export const fetchAll = (items: Todo[]): Action => ({ type: SET_ITEMS, payload: items });
export const add = (item: Todo): Action => ({ type: ADD_TODO, payload: item });
export const update = (id: number, completed: boolean): Action => ({ type: UPDATE_ITEM, payload: { id, completed } });
export const remove = (id: number): Action => ({ type: REMOVE_ITEM, payload: id });
export const showDeleteConfirmation = (id: number): Action => ({ type: SHOW_DELETE_CONFIRMATION, payload: id });
export const hideDeleteConfirmation = (): Action => ({ type: HIDE_DELETE_CONFIRMATION });
