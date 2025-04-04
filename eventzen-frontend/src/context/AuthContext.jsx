import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and fetch user data
      // You might want to add an API call here to validate the token
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { token, user: userData } = await apiLogin(credentials);
      localStorage.setItem('token', token);
      setUser({ ...userData, token });
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { token, user: userData } = await apiRegister(userData);
      localStorage.setItem('token', token);
      setUser({ ...userData, token });
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user?.token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}