import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({children}) => {
    // Login token
    const ltk = sessionStorage.getItem('ltk');
    // Register token
    const rtk = sessionStorage.getItem('rtk');
    if(!ltk || !rtk){
        return <Navigate to="/login"></Navigate>
    }
    else{
        return children
    }
}

export default ProtectedRoutes;