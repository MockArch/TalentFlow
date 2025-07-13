
"use client"

import * as React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, UserCheck, PlusCircle, ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { users as panelists, User } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';


const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    status: 'Open',
    description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building the...',
    openings: 2,
    applicants: 12,
    inPipeline: 5,
    hired: 1,
  },
  {
    title: 'Full Stack Developer',
    status: 'Open',
    description: 'Seeking a versatile Full Stack Developer to design, develop, and maintain both front-end and back-end...',
    openings: 1,
    applicants: 12,
    inPipeline: 5,
    hired: 1,
  },
  {
    title: 'DevOps Engineer',
    status: 'Closed',
    description: 'Join our infrastructure team as a DevOps Engineer. You will be responsible for deploying, automating...',
    openings: 1,
    applicants: 12,
    inPipeline: 5,
    hired: 1,
  },
  {
    title: 'Product Manager',
    status: 'On Hold',
    description: 'Lead the product vision, strategy, and roadmap. Work closely with engineering, design, and marketing teams.',
    openings: 1,
    applicants: 25,
    inPipeline: 8,
    hired: 0,
  },
   {
    title: 'UX/UI Designer',
    status: 'Open',
    description: 'Create intuitive and visually appealing user interfaces for our web and mobile applications.',
    openings: 1,
    applicants: 18,
    inPipeline: 6,
    hired: 0,
  },
  {
    title: 'Backend Engineer',
    status: 'Closed',
    description: 'Develop and maintain server-side logic, databases, and APIs for our applications.',
    openings: 1,
    applicants: 15,
    inPipeline: 4,
    hired: 1,
  },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Open: 'default',
  'On Hold': 'secondary',
  Closed: 'destructive',
};

const statusColor: { [key: string]: string } = {
    Open: 'bg-green-100 text-green-800 border-green-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Closed: 'bg-red-100 text-red-800 border-red-200',
};

function CreateJobDialog() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedPanelists, setSelectedPanelists] = React.useState<User[]>([]);
    const [popoverOpen, setPopoverOpen] = React.useState(false);

    const handleCreateJob = () => {
        // In a real app, you'd handle form submission here.
        console.log("Creating job...");
        setDialogOpen(false); // Close the dialog on creation
    }

    return (
     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Job
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Create a New Job Opening</DialogTitle>
                <DialogDescription>
                    Fill out the details below to post a new job.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="e.g. Senior Frontend Developer" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea id="job-description" placeholder="Enter a detailed job description..." rows={5} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="openings">Number of Openings</Label>
                        <Input id="openings" type="number" placeholder="e.g. 2" />
                    </div>
                     <div className="space-y-2">
                        <Label>Assign Panelists</Label>
                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={popoverOpen}
                                className="w-full justify-between"
                                >
                                {selectedPanelists.length > 0
                                    ? selectedPanelists.map(p => p.name).join(', ')
                                    : "Select panelists..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search panelists..." />
                                    <CommandList>
                                        <CommandEmpty>No panelists found.</CommandEmpty>
                                        <CommandGroup>
                                            {panelists.map((panelist) => (
                                            <CommandItem
                                                key={panelist.email}
                                                onSelect={() => {
                                                    setSelectedPanelists(current => 
                                                        current.some(p => p.email === panelist.email)
                                                            ? current.filter(p => p.email !== panelist.email)
                                                            : [...current, panelist]
                                                    );
                                                    setPopoverOpen(true);
                                                }}
                                            >
                                                <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedPanelists.some(p => p.email === panelist.email) ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {panelist.name}
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleCreateJob}>Create Job</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}


export default function JobsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Jobs</h1>
            <p className="text-lg text-muted-foreground mt-1">Open Positions</p>
          </div>
          <CreateJobDialog />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobOpenings.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="open" className="mt-6">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobOpenings.filter(j => j.status === 'Open').map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="on-hold" className="mt-6">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobOpenings.filter(j => j.status === 'On Hold').map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="closed" className="mt-6">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobOpenings.filter(j => j.status === 'Closed').map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}


function JobCard({ title, status, description, openings, applicants, inPipeline, hired }: (typeof jobOpenings)[0]) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    <Badge variant={statusVariant[status]} className={cn('whitespace-nowrap', statusColor[status])}>
                        {status}
                    </Badge>
                </div>
                <CardDescription className="pt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{openings} Openings</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{applicants} Applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{inPipeline} In Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        <span>{hired} Hired</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full bg-gray-800 text-white hover:bg-gray-700">
                    <Link href="#">
                        View Job
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
