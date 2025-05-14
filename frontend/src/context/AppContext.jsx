'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create API instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create context
const AppContext = createContext();

// Token management functions
const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  // Set token for future axios requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return token;
};

const removeToken = () => {
  localStorage.removeItem('authToken');
  delete api.defaults.headers.common['Authorization'];
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = getStoredToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/api/users/verify');
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification error:', error);
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      
      // Store token
      storeToken(data.token);
      
      // Set user data
      setUser(data.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || 'Login failed'
      };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const { data } = await api.post('/api/users/register', userData);

      // Store token if returned with registration
      if (data.token) {
        storeToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || 'Signup failed'
      };
    }
  };

  // Logout function
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const token = getStoredToken();
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await api.put('/api/users/update', userData);

      // Update user in state
      setUser(prevUser => ({
        ...prevUser,
        ...data
      }));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || 'Update failed'
      };
    }
  };

  // Check if user has specific role 
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Value object to be provided to consumers
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
    hasRole,
    api // Expose configured axios instance for use in components
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};