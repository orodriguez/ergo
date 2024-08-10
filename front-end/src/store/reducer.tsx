import * as actions from "src/todos/actions";
import { State } from "./state";

export const reducer = (state: State, action: actions.Action): State => {
    switch (action.type) {
        case actions.NEW_TODO_TITLE_CHANGE:
            return { ...state, newTodoTitle: action.payload };
        case actions.FETCH_ALL_TODOS:
            return { ...state, todos: action.payload };
        case actions.ADD_TODO:
            return { ...state, todos: [action.payload, ...state.todos], newTodoTitle: '' };
        case actions.TOGGLE_TODO_COMPLETED:
            return {
                ...state,
                todos: state.todos.map(item =>
                    item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
                ),
            };
        case actions.REMOVE_TODO:
            return { ...state, todos: state.todos.filter(item => item.id !== action.payload) };
        case actions.SHOW_DELETE_CONFIRMATION:
            return { ...state, deleteConfirmationTarget: action.payload };
        case actions.HIDE_DELETE_CONFIRMATION:
            return { ...state, deleteConfirmationTarget: null };
        default:
            return state;
    }
};