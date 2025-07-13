"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, Users, User, Upload, BarChart, Settings, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Jobs', icon: Briefcase },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '#', label: 'Panelists', icon: User },
  { href: '#', label: 'Upload Resumes', icon: Upload },
  { href: '#', label: 'Analytics', icon: BarChart },
  { href: '#', label: 'Integrations', icon: Briefcase },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold text-lg">N</div>
          <span className={state === 'collapsed' ? 'hidden' : 'block'}>HarborView</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-2 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="h-10 justify-start data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
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
       <div className="mt-auto flex flex-col gap-2 p-4 border-t">
          <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton className="h-10 justify-start" tooltip={{children: "Settings", side:"right", align:"center"}}>
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton className="h-10 justify-start" tooltip={{children: "User Profile", side:"right", align:"center"}}>
                      <User className="h-5 w-5" />
                      <span>User Profile</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10 justify-start" tooltip={{children: "Logout", side:"right", align:"center"}}>
                    <Link href="/login">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
           <div className={`mt-4 flex items-center p-2 rounded-lg ${state === 'collapsed' ? 'justify-center' : ''}`}>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold text-lg">
                N
              </div>
          </div>
      </div>
    </div>
  );
}
