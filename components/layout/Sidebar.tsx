'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, APP_NAME } from '@/app/utils/constant';
import { Role } from '@/app/types/user';
import { cn } from '@/lib/utils';
import { Building2, LucideIcon, Menu, X } from 'lucide-react';

interface SidebarProps {
  role: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = NAV_ITEMS.filter(
    (item) => item.role === role || item.role === "ALL"
  );

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Trigger Button (Visible only on mobile) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button 
           onClick={() => setIsOpen(!isOpen)}
           className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary" onClick={closeSidebar}>
            <Building2 className="h-6 w-6" />
            <span>{APP_NAME}</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1.5">
            {filteredItems.map((item) => {
              // Exact match or sub-path match
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon as LucideIcon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3 px-2 py-2 mb-2">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-medium text-muted-foreground">System Operational</span>
            </div>
            <p className="text-[10px] text-center text-muted-foreground/60">
                &copy; 2024 {APP_NAME}
            </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
