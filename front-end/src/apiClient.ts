import axios from 'axios';
import todoApiClient from './todos/apiClient';

const API_URL = 'http://localhost:3000';

const createApiClient = (
    onLoadingStarted: () => void = () => { },
    onLoadingEnded: () => void = () => { }
) => {
    const customAxios = axios.create({
        baseURL: API_URL
    });

    customAxios.interceptors.request.use((config) => {
        onLoadingStarted();
        return config;
    }, (error) => {
        onLoadingEnded();
        return Promise.reject(error);
    });

    return {
        todos: todoApiClient(customAxios)
    };
}

export default createApiClient;