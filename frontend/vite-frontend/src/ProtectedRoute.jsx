// Protected routes based on whether or not the local storage contains the user id (sent to local storage based on a successful login)
// Logic is a bit gross but limited timespan and it works

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('user_id') !== null;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;