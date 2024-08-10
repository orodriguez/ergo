import { Todo } from './types';

export type Action =
    | { type: 'SET_NEW_TODO_TITLE'; payload: string }
    | { type: 'SET_ACTIVE_REQUESTS'; payload: number }
    | { type: 'SET_ITEMS'; payload: Todo[] }
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'UPDATE_ITEM'; payload: { id: number, completed: boolean } }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'SHOW_DELETE_CONFIRMATION'; payload: number }
    | { type: 'HIDE_DELETE_CONFIRMATION' };


// Action Creators
export const changeTitle = (title: string): Action => ({ type: 'SET_NEW_TODO_TITLE', payload: title });
export const setActiveRequests = (count: number): Action => ({ type: 'SET_ACTIVE_REQUESTS', payload: count });
export const fetchAll = (items: Todo[]): Action => ({ type: 'SET_ITEMS', payload: items });
export const add = (item: Todo): Action => ({ type: 'ADD_TODO', payload: item });
export const update = (id: number, completed: boolean): Action => ({ type: 'UPDATE_ITEM', payload: { id, completed } });
export const remove = (id: number): Action => ({ type: 'REMOVE_ITEM', payload: id });
export const showDeleteConfirmation = (id: number): Action => ({ type: 'SHOW_DELETE_CONFIRMATION', payload: id });
export const hideDeleteConfirmation = (): Action => ({ type: 'HIDE_DELETE_CONFIRMATION' });