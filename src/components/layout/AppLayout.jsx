import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex shrink-0" />

      {/* Mobile Nav Top & Bottom */}
      <MobileNav />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-12 px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
