"use client";

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/candidates':
      return 'Candidates';
    case '/interviews':
      return 'Interviews';
    case '/skills':
      return 'Skill Identifier';
    default:
      if (pathname.startsWith('/candidates/')) return 'Candidate Profile';
      return 'TalentFlow';
  }
};

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-lg font-semibold md:text-xl font-headline">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
