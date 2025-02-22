import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cookieMethods from '../../../../../utils/cookieUtils';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Full URL:', window.location.href);
    console.log('Search Params:', window.location.search);
  
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const refresh_token = queryParams.get("refresh_token");
  
    console.log('Extracted Token:', token);
    console.log('Extracted Refresh Token:', refresh_token);
    
    if (token) {
      sessionStorage.setItem('authToken', token);
      cookieMethods.setCookies(token, refresh_token);
      toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
      navigate('/');
    } else {
      console.error('No token found in the URL');
      navigate('/login');
    }
  
  }, [location, navigate]);
  

  return (
    <div>
      <h2>Processing Google Login...</h2>
      <p>Redirecting...</p>
    </div>
  );
};

export default GoogleCallback;