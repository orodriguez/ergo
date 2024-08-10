import { Action } from "src/todos/actions";
import { State } from "./state";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_NEW_TODO_TITLE':
            return { ...state, newTodoTitle: action.payload };
        case 'SET_ACTIVE_REQUESTS':
            return { ...state, activeRequests: action.payload };
        case 'SET_ITEMS':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [action.payload, ...state.todos], newTodoTitle: '' };
        case 'UPDATE_ITEM':
            return {
                ...state,
                todos: state.todos.map(item =>
                    item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
                ),
            };
        case 'REMOVE_ITEM':
            return { ...state, todos: state.todos.filter(item => item.id !== action.payload) };
        case 'SHOW_DELETE_CONFIRMATION':
            return { ...state, deleteConfirmationTarget: action.payload };
        case 'HIDE_DELETE_CONFIRMATION':
            return { ...state, deleteConfirmationTarget: null };
        default:
            return state;
    }
};