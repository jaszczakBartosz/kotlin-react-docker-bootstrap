import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios'
import {getAuthToken, logout} from "../services/authService.ts";

const api = axios.create({
    baseURL: 'api'
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Clear the invalid token
            logout();
            // Redirect to login page or handle token expiration
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;