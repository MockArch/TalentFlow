"use client";

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

const getPageTitle = (pathname: string) => {
  // This function is removed as the title "Dashboard" is now hardcoded in the page
  // and other page titles are not part of the current design.
  return '';
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm lg:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      {/* The h1 title is now rendered on the page itself */}
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
