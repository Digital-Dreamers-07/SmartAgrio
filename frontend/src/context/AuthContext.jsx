import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        
        try {
          const response = await authAPI.getMe();
          setUser(response.data.data);
        } catch (error) {
          console.error('Token validation failed:', error);
          handleLogout();
        }
      }
      setLoading(false);
    }

    initAuth();
  }, []);

  async function handleLogin(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      const responseToken = response.data.token;
      const responseUser = response.data.user;
      
      setToken(responseToken);
      setUser(responseUser);
      localStorage.setItem('token', responseToken);
      localStorage.setItem('user', JSON.stringify(responseUser));
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  }

  async function handleRegister(userData) {
    try {
      const response = await authAPI.register(userData);
      const responseToken = response.data.token;
      const responseUser = response.data.user;
      
      setToken(responseToken);
      setUser(responseUser);
      localStorage.setItem('token', responseToken);
      localStorage.setItem('user', JSON.stringify(responseUser));
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  function handleUpdateUser(userData) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  const value = {
    user: user,
    token: token,
    loading: loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser: handleUpdateUser,
    isAuthenticated: Boolean(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}