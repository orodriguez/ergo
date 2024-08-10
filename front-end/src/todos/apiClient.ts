import { AxiosInstance } from 'axios';
import { CreateTodoRequest, UpdateTodoRequest, Todo } from './types';

export interface ApiClient {
    fetch: () => Promise<Todo[]>;
    add: (request: CreateTodoRequest) => Promise<Todo>;
    remove: (id: number) => Promise<void>;
    update: (id: number, request: UpdateTodoRequest) => Promise<Todo>;
}

export const apiClient = (axios: AxiosInstance) =>
({
    fetch: async (): Promise<Todo[]> => {
        const response = await axios.get(`/todos`);
        return response.data;
    },
    add: async (request: CreateTodoRequest): Promise<Todo> => {
        const response = await axios.post(`/todos`, request);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axios.delete(`/todos/${id}`);
    },
    update: async (id: number, request: UpdateTodoRequest): Promise<Todo> => {
        const response = await axios.put(`/todos/${id}`, request);
        return response.data;
    },
});

export default apiClient;