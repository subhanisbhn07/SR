import React from 'react';
import { useAuthStore } from '../../features/auth/store/authStore';
import { LoginForm } from '../../features/auth/components/LoginForm';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  return <>{children}</>;
};
