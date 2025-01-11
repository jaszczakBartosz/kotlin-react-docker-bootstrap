export interface LoginRequest {
    username: string;
    password: string;
}

export type RegisterRequest = LoginRequest

export interface AuthResponse {
    token: string;
}