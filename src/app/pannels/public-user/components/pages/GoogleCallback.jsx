import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the query params from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Store the token in sessionStorage or localStorage
      sessionStorage.setItem('authToken', token);
      console.log('Google token:', token);

      // Redirect the user to the homepage or wherever you need
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
