
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminPage({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();
  
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!isAdmin) {
    // Redirect to home if logged in but not admin
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar />
          <div className="flex-1">
            <AdminHeader />
            <main className="mt-6 pb-16">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
