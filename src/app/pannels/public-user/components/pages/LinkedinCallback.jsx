import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookieMethods from '../../../../../utils/cookieUtils';
import toast from 'react-hot-toast';

const LinkedinCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the query params from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const refreshToken = queryParams.get("refresh_token");

    if (token) {
      // Store the token in sessionStorage or localStorage
      sessionStorage.setItem('authToken', token);
      // Store tokens in cookies
      cookieMethods.setCookies(token, refreshToken || ""); // Ensure no null values

      // ✅ Show success toast
      toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

      // Redirect after successful login
      navigate('/'); 
    } else {
      
      toast.error("Login failed. Please try again.", { position: "top-right", autoClose: 3000 });

      navigate('/login'); // Redirect the user to login if there's no token
    }
  }, [navigate]); // Removed `location` since it's not used

  return (
    <div>
      <h2>Processing LinkedIn Login...</h2>
      <p>Redirecting...</p>
    </div>
  );
};

export default LinkedinCallback;
