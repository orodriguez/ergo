import { Todo } from "src/todos/types";

export type State = {
    newTodoTitle: string;
    activeRequests: number;
    items: Todo[];
    deleteConfirmationTarget: number | null;
};