import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(ThemeContext);

    return (
        user ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute;