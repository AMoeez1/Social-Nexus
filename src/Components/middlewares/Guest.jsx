import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Guest({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthenticated(true);
      navigate('/home');
    }
  }, [navigate]);

  return !authenticated ? children : null;
}
