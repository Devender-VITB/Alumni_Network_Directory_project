import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
        <p className="text-sm font-medium text-text-secondary">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-status-error-bg text-status-error flex items-center justify-center ring-8 ring-status-error-bg/50">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">Access Restricted</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          The requested management console requires administrator privileges. Your current account ({user?.email}) is registered as a regular member.
        </p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Member Dashboard</Button>
        </Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
