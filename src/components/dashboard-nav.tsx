
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Settings, LogOut, Briefcase, Upload, BarChart, HelpCircle, Puzzle, User, CalendarDays } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '/interviews', label: 'Interviews', icon: CalendarDays },
  { href: '/panelists', label: 'Panelists', icon: User },
  { href: '/integrations', label: 'Integrations', icon: Puzzle },
];

const secondaryNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col">
       <div className="flex h-16 items-center border-b px-4 lg:px-6 bg-sidebar">
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-sidebar-foreground">
           <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg">
            T
          </div>
          <span className={state === 'collapsed' ? 'hidden' : 'block'}>TalentFlow</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-1 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  className="h-10 justify-start text-sm font-normal text-sidebar-foreground/80 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                  tooltip={{children: item.label, side:"right", align:"center"}}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
       <div className="mt-auto flex flex-col gap-2 p-4 border-t border-sidebar-border">
          <SidebarMenu className="space-y-1">
               {secondaryNavItems.map((item) => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className="h-10 justify-start text-sm font-normal text-sidebar-foreground/80 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                      tooltip={{children: item.label, side:"right", align:"center"}}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
               <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10 justify-start text-sm font-normal text-sidebar-foreground/80" tooltip={{children: "Logout", side:"right", align:"center"}}>
                    <Link href="/login">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
      </div>
    </div>
  );
}
