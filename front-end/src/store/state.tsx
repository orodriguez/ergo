import { Todo } from "src/todos/types";

export type State = {
    newTodoTitle: string;
    activeRequests: number;
    todos: Todo[];
    deleteConfirmationTarget: number | null;
};

export const initialState: State = {
    newTodoTitle: '',
    activeRequests: 0,
    todos: [],
    deleteConfirmationTarget: null,
};