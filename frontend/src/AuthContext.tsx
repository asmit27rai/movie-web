// src/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  role: 'user' | 'admin' | null;
  setRole: (role: 'user' | 'admin' | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [role, setRole] = useState<'user' | 'admin' | null>(() => {
    const savedRole = localStorage.getItem('role');
    return savedRole ? (savedRole as 'user' | 'admin') : null;
  });
  
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // Persist role and authentication status to localStorage
  useEffect(() => {
    localStorage.setItem('role', role !== null ? role : '');
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [role, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ role, setRole, isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
