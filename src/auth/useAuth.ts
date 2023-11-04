import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const theuser = JSON.parse(localStorage.getItem('user'))
    if (token && theuser) {
      setIsLoggedIn(true);
      setUser(theuser)
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return { isLoggedIn, user };
};
