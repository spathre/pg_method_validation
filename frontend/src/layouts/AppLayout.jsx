import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AppLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-slate-50 text-slate-800">
      <Topbar />
      <div className="flex h-[calc(100vh-3.5rem)]"> {/* 3.5rem = 56px topbar */}
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
