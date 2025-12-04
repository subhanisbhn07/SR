import React, { useState } from 'react';
import { Header } from '../../features/layout/components/Header';
import { Sidebar } from '../../features/layout/components/Sidebar';
import { SessionPlayer } from '../../features/wellness/components/SessionPlayer';
import { useWellnessStore } from '../../features/wellness/store/wellnessStore';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentSession, clearCurrentSession } = useWellnessStore();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {currentSession && (
        <SessionPlayer
          session={currentSession}
          onClose={clearCurrentSession}
        />
      )}
    </div>
  );
};
