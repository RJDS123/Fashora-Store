
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define user type and context
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if user is logged in on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('eazyshop-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.role === 'admin' || parsedUser.email === 'admin@example.com');
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);
  
  // Mock login function - in a real app, this would make an API request
  const login = (email: string, password: string) => {
    // For demo purposes, accept any valid-looking email/password
    if (!email.includes('@') || password.length < 6) {
      toast.error('Invalid email or password');
      return;
    }
    
    // Check if this is the admin account
    const isAdminAccount = email === 'admin@example.com';
    
    // Create mock user data
    const userData: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: isAdminAccount ? 'admin' : 'customer'
    };
    
    // Save user data and update state
    localStorage.setItem('eazyshop-user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(isAdminAccount);
    
    toast.success(`Successfully logged in${isAdminAccount ? ' as admin' : ''}`);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('eazyshop-user');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.info('Successfully logged out');
  };
  
  const value = {
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
