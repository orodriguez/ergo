import { AxiosInstance } from 'axios';
import { Todo } from './todo';

const apiClient = (axios: AxiosInstance) =>
({
    fetch: async (): Promise<Todo[]> => {
        const response = await axios.get(`/todos`);
        return response.data;
    },
    add: async (todo: Todo): Promise<Todo> => {
        const response = await axios.post(`/todos`, todo);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axios.delete(`/todos/${id}`);
    },
    complete: async (id: number): Promise<Todo> => {
        const response = await axios.put(`/todos/${id}`, { completed: true });
        return response.data;
    },
});

export default apiClient;