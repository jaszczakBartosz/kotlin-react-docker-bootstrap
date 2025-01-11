import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from "react";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
    const { isAuth } = useAuth();
    return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;