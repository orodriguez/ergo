export interface CreateRequest {
    title: string;
}

export interface Response {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}