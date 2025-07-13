"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Settings, LogOut, Briefcase, Upload, BarChart, HelpCircle, GitMerge } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/panelists', label: 'Panelists', icon: Users },
  { href: '/upload-resume', label: 'Upload Resume', icon: Upload },
  { href: '/analytics', label: 'Analytics', icon: BarChart },
  { href: '/integrations', label: 'Integrations', icon: GitMerge },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex h-full flex-col">
       <div className="flex h-16 items-center border-b px-4 lg:px-6 bg-sidebar">
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-primary-foreground">
           <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-primary font-bold text-lg">
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
                  isActive={pathname === item.href}
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
          <SidebarMenu>
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
