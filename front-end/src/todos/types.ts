export interface CreateRequest {
    title: string;
}

export interface UpdateRequest {
    completed: boolean;
}

export interface Response {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}