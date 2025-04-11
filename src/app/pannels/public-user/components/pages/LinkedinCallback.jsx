import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const LinkedinCallback = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  useEffect(() => {
    const error = query.get('error');
    const errorDesc = query.get('error_description');
    const code = query.get('code');
    
    if (error) {
      console.error('LinkedIn OAuth Error:', errorDesc || error);
      // You can redirect or show a message
    } else if (code) {
      console.log('Authorization code:', code);
      // Send to backend to exchange for access token
    }
  }, [query]);

  return <div>Processing LinkedIn login...</div>;
};

export default LinkedinCallback;
