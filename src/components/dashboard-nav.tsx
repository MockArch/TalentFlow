"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Calendar, Cpu, Briefcase } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '/interviews', label: 'Interviews', icon: Calendar },
  { href: '/skills', label: 'Skill Identifier', icon: Cpu },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className={state === 'collapsed' ? 'hidden' : 'block'}>TalentFlow</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{children: item.label, side:"right", align:"center"}}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </div>
  );
}
