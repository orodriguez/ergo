import axios from 'axios';
import todoApiClient from './todos/apiClient';

const API_URL = 'http://localhost:3000';

const createApiClient = (
    onLoadingStatusChanged: (status: boolean) => void = (status) => { }
) => {
    const customAxios = axios.create({
        baseURL: API_URL
    });

    customAxios.interceptors.request.use((config) => {
        onLoadingStatusChanged(true);
        return config;
    }, (error) => {
        onLoadingStatusChanged(false);
        return Promise.reject(error);
    });

    return {
        todos: todoApiClient(customAxios)
    };
}

export default createApiClient;