import axios from 'axios';
import { apiClient as todoApiClient, ApiClient as TodoApiClient } from './todos/apiClient';

const API_URL = 'http://localhost:3000';

export interface ApiClient {
    todos: TodoApiClient;
}

export const createApiClient = (
    setActiveRequests: (activeRequests: (prev: number) => number) => void
) => {
    const customAxios = axios.create({
        baseURL: API_URL
    });



    customAxios.interceptors.request.use((config) => {
        console.log('Request made');
        setActiveRequests(prev => prev + 1);
        return config;
    }, (error) => {
        setActiveRequests(prev => prev - 1);
        return Promise.reject(error);
    });

    // Response interceptor
    customAxios.interceptors.response.use(
        (response) => {
            setActiveRequests(prev => prev - 1);
            return response;
        },
        (error) => {
            setActiveRequests(prev => prev - 1);
            return Promise.reject(error);
        }
    );

    return {
        todos: todoApiClient(customAxios)
    };
}

export default createApiClient;