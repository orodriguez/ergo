import axios from 'axios';
import { apiClient as todoApiClient, ApiClient as TodoApiClient } from './todos/apiClient';

const API_URL = 'http://localhost:3000';

export interface ApiClient {
    todos: TodoApiClient;
}

export const createApiClient = () => {
    const customAxios = axios.create({
        baseURL: API_URL
    });

    return {
        todos: todoApiClient(customAxios)
    };
}

export default createApiClient;