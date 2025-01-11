import {AuthResponse, LoginRequest, RegisterRequest} from '../types/auth';
import api from "../api/client.ts";


class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

const handleAuthRequest = async (
    url: string,
    credentials: LoginRequest | RegisterRequest
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(`auth/${url}`, credentials);

    if (!response.status.toString().startsWith('2')) {
        const errorData = response.data
        throw new AuthError(JSON.stringify(errorData) || `Authentication failed for ${url}`);
    }

    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
};

export const login = (credentials: LoginRequest): Promise<AuthResponse> =>
    handleAuthRequest('login', credentials);

export const register = (credentials: RegisterRequest): Promise<AuthResponse> =>
    handleAuthRequest('register', credentials);

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const getAuthToken = (): string | null =>
    localStorage.getItem('token');

export const isAuthenticated = (): boolean =>
    !!getAuthToken();