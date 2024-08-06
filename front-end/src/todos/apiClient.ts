import { AxiosInstance } from 'axios';
import { CreateRequest, Response } from './types';

const apiClient = (axios: AxiosInstance) =>
({
    fetch: async (): Promise<Response[]> => {
        const response = await axios.get(`/todos`);
        return response.data;
    },
    add: async (todo: CreateRequest): Promise<Response> => {
        const response = await axios.post(`/todos`, todo);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axios.delete(`/todos/${id}`);
    },
    complete: async (id: number): Promise<Response> => {
        const response = await axios.put(`/todos/${id}`, { completed: true });
        return response.data;
    },
});

export default apiClient;