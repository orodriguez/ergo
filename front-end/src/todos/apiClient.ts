import { AxiosInstance } from 'axios';
import { CreateRequest, UpdateRequest, Response } from './types';

export interface ApiClient {
    fetch: () => Promise<Response[]>;
    add: (request: CreateRequest) => Promise<Response>;
    remove: (id: number) => Promise<void>;
    update: (id: number, request: UpdateRequest) => Promise<Response>;
}

export const apiClient = (axios: AxiosInstance) =>
({
    fetch: async (): Promise<Response[]> => {
        const response = await axios.get(`/todos`);
        return response.data;
    },
    add: async (request: CreateRequest): Promise<Response> => {
        const response = await axios.post(`/todos`, request);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axios.delete(`/todos/${id}`);
    },
    update: async (id: number, request: UpdateRequest): Promise<Response> => {
        const response = await axios.put(`/todos/${id}`, request);
        return response.data;
    },
});

export default apiClient;