import axios from 'axios';
import todoApiClient from './todos/apiClient';

const API_URL = 'http://localhost:3000';

const createApiClient = (
    setActiveRequests: (activeRequests: (prev: number) => number) => void
) => {
    const customAxios = axios.create({
        baseURL: API_URL
    });



    customAxios.interceptors.request.use((config) => {
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