
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'doctor' | 'nurse' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  licenseNumber?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'dr.smith@hospital.com',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    licenseNumber: 'MD123456',
    specialization: 'Internal Medicine'
  },
  {
    id: '2',
    email: 'nurse.jones@hospital.com',
    name: 'Jennifer Jones',
    role: 'nurse',
    licenseNumber: 'RN789012'
  },
  {
    id: '3',
    email: 'admin@hospital.com',
    name: 'System Administrator',
    role: 'admin'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('healthcare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('healthcare_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
