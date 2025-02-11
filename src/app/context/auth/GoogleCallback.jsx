import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateUser } = useAuth(); 

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            try {
                // send to backend to verify
                const res = axios.post(`${process.env.REACT_APP_BASE_URL}google/callback`, {
                    token
                })
                console.log("google-res", res)

                updateUser(res.data.user);
                navigate('/dashboard');
            } catch (error) {
                toast.error('Error processing Google login');
                navigate('/login');
            }
        } else {
            toast.error('No token received');
            navigate('/login');
        }
    }, [location, navigate, updateUser]);

    return <div>Processing Google Login...</div>;
};

export default GoogleCallback;