
import { DashboardLayout } from '@/components/dashboard-layout';
import { users as panelists } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Mail, Phone, BrainCircuit, CalendarClock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function PanelistsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold font-headline">Panelists</h1>
            <p className="text-muted-foreground">
              Manage your interview panelists.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Panelist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Panelist</DialogTitle>
                <DialogDescription>
                  Enter the details of the new panelist to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="e.g. Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="jane.d@example.com" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="role">Role / Department</Label>
                  <Input id="role" placeholder="e.g. Senior Engineer, Design" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="expertise">Expertise</Label>
                  <Input id="expertise" placeholder="e.g. React, System Design, UX" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="availability">Availability</Label>
                   <Textarea id="availability" placeholder="e.g. Tuesdays & Thursdays after 2pm" />
                </div>
              </div>
              <Button type="submit" className="w-full">Save Panelist</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {panelists.map((panelist) => (
            <Card key={panelist.email} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={panelist.avatar} alt={panelist.name} data-ai-hint="person" />
                          <AvatarFallback>{panelist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{panelist.name}</CardTitle>
                            <CardDescription>{panelist.role}</CardDescription>
                        </div>
                    </div>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{panelist.email}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{panelist.phone}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>{panelist.expertise}</span>
                 </div>
                 <div className="flex items-start gap-2">
                    <CalendarClock className="h-4 w-4 mt-0.5" />
                    <span>{panelist.availability}</span>
                 </div>
              </CardContent>
              <CardFooter>
                 <Badge variant={panelist.status === 'Active' ? 'secondary' : 'destructive'} className={panelist.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                    {panelist.status}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
