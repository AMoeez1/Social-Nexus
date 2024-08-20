import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(atob(user));
        if (parsedUser) {
          setAuthenticated(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  return authenticated ? children : null;
}
