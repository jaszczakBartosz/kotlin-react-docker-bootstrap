import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { isAuthenticated } from '../services/authService';

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};