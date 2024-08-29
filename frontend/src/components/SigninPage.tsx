import React, { useState, useEffect } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { useAuth } from '@/AuthContext';

const SigninPage: React.FC = () => {
  const { setRole, setAuthenticated } = useAuth();
  
  // Initialize state from localStorage or default to empty string
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | ''>(() => {
    const savedRole = localStorage.getItem('selectedRole');
    return savedRole ? (savedRole as 'user' | 'admin') : '';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  useEffect(() => {
    // Save selected role and authentication status to localStorage
    localStorage.setItem('selectedRole', selectedRole);
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [selectedRole, isAuthenticated]);

  const handleSignIn = async () => {
    if (!selectedRole) {
      console.error("Please select a role.");
      return;
    }

    try {
      setRole(selectedRole);
      setAuthenticated(true);
      setIsAuthenticated(true);  // Update local state and localStorage
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      <div className="text-center max-w-sm w-full px-4">
        <img src="./gif_movie.gif" alt="Movie Theater" className="w-full h-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Welcome to the Ultimate Movie Theater Experience With Cinematic Universe!</h1>
        <p className="text-lg mb-6">Sign in to explore the latest movies and showtimes.</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="user"
                checked={selectedRole === 'user'}
                onChange={() => setSelectedRole('user')}
                className="mr-2"
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="admin"
                checked={selectedRole === 'admin'}
                onChange={() => setSelectedRole('admin')}
                className="mr-2"
              />
              Admin
            </label>
          </div>
        </div>

        <button
          className="bg-red-600 text-white py-2 px-6 text-lg font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
          onClick={handleSignIn}
        >
          <SignInButton />
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
