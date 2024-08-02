// src/api/todos.ts
import axios from 'axios';
import { Todo } from './todo';

// Replace with your Rails API base URL
const API_URL = 'http://localhost:3000';

const fetch = async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
};

const add = async (todo: Todo): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
};

const complete = async (id: number): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, { completed: true });
    return response.data;
};

export default {
    fetch,
    add,
    remove,
    complete,
};
