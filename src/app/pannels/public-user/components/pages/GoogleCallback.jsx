import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cookieMethods from '../../../../../utils/cookieUtils';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the query params from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const refreshToken = queryParams.get("refresh_token");

    if (token) {
      // Store the token in sessionStorage or localStorage
      sessionStorage.setItem('authToken', token);
      console.log('Google token:', token);
      cookieMethods.setCookies(token, refreshToken);
 // ✅ Show success toast
       // ✅ Show success toast
     toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
      navigate('/'); // Change this to the page you want the user to go to
    } else {
      console.error('No token found in the URL');
      navigate('/login'); // Redirect the user to login if there's no token
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
