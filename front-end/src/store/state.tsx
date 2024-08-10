import { Todo } from "src/todos/types";

export type State = {
    newTodoTitle: string;
    activeRequests: number;
    todos: Todo[];
    deleteConfirmationTarget: number | null;
};