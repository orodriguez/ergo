export interface CreateTodoRequest {
    title: string;
}

export interface UpdateTodoRequest {
    completed: boolean;
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}