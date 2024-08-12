import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createApiClient = () => {
    const customAxios = axios.create({
        baseURL: API_URL
    });

    return {
        getStatus: () => customAxios.get('/status'),
    };
}

export default createApiClient;