
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, User } from 'lucide-react';

export default function AdminHeader() {
  const { user } = useAuth();
  
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={18} />
          </div>
          <div className="text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
