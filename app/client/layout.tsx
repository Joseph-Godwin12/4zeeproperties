import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageHeader from '@/components/layout/PageHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar role="CLIENT" />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
           <PageHeader title="Client Portal" subtitle="Manage your property applications and saved homes." />
           {children}
        </div>
      </div>
    </div>
  );
}
