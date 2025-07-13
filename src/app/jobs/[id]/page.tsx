
'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, UserCheck, Briefcase, Star, MessageSquare, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const initialJobDetails = {
  title: 'Senior Frontend Developer',
  status: 'Open' as 'Open' | 'On Hold' | 'Closed',
  postedDate: 'June 29th, 2025',
  hiringPanel: ['John Smith', 'Jane Doe'],
  stats: {
    openings: 2,
    applicants: 12,
    inPipeline: 5,
    hired: 1,
  },
};

const matchedCandidates = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Frontend Developer',
    avatar: 'https://placehold.co/100x100.png?text=SJ',
    status: 'Interview',
    matchScore: 95,
    topSkills: ['React', 'TypeScript', 'Node.js', '+4'],
  },
  {
    name: 'Olivia Miller',
    role: 'Software Engineer in Test',
    avatar: 'https://placehold.co/100x100.png?text=OM',
    status: 'Interview',
    matchScore: 93,
    topSkills: ['Java', 'Selenium', 'Appium', '+2'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Backend Developer',
    avatar: 'https://placehold.co/100x100.png?text=ER',
    status: 'Screening',
    matchScore: 92,
    topSkills: ['Java', 'Spring Boot', 'Microservices', '+2'],
  },
  {
    name: 'Amanda Brown',
    role: 'Data Scientist',
    avatar: 'https://placehold.co/100x100.png?text=AB',
    status: 'Interview',
    matchScore: 91,
    topSkills: ['Python', 'R', 'TensorFlow', '+2'],
  },
  {
    name: 'David Lee',
    role: 'DevOps Engineer',
    avatar: 'https://placehold.co/100x100.png?text=DL',
    status: 'New',
    matchScore: 90,
    topSkills: ['AWS', 'Terraform', 'Jenkins', '+3'],
  },
  {
    name: 'Kevin Taylor',
    role: 'UX/UI Designer',
    avatar: 'https://placehold.co/100x100.png?text=KT',
    status: 'New',
    matchScore: 89,
    topSkills: ['Figma', 'Adobe XD', 'Sketch', '+2'],
  },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Open: 'default',
  Interview: 'default',
  Screening: 'secondary',
  New: 'outline',
  'On Hold': 'secondary',
  Closed: 'destructive',
};

const statusColor: { [key: string]: string } = {
    Open: 'bg-green-100 text-green-800',
    Interview: 'bg-purple-100 text-purple-800',
    Screening: 'bg-yellow-100 text-yellow-800',
    New: 'bg-blue-100 text-blue-800',
    'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Closed: 'bg-red-100 text-red-800 border-red-200',
};

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number }) => (
  <Card className="bg-muted/50 border-none shadow-none">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="p-3 bg-background rounded-lg">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const CandidateCard = ({ name, role, avatar, status, matchScore, topSkills }: (typeof matchedCandidates)[0]) => (
  <Card className="flex flex-col">
    <CardContent className="p-6 flex flex-col flex-grow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
                <AvatarImage src={avatar} alt={name} data-ai-hint="person" />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </div>
        <Badge variant={statusVariant[status]} className={cn('whitespace-nowrap', statusColor[status])}>
            {status}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4 flex-grow">
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Match Score</span>
            </div>
            <span className="font-semibold">{matchScore}%</span>
        </div>
        <Progress value={matchScore} className="h-1.5" />
      </div>

       <div className="space-y-2 mb-6">
        <p className="text-sm text-muted-foreground">Top Skills</p>
        <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="font-normal">{skill}</Badge>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline">View Details</Button>
        <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [jobDetails, setJobDetails] = React.useState(initialJobDetails);
  const jobStatuses: Array<'Open' | 'On Hold' | 'Closed'> = ['Open', 'On Hold', 'Closed'];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-muted-foreground mb-2">Job Details</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    {jobDetails.title}
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={cn("flex items-center gap-2", statusColor[jobDetails.status])}>
                           <Badge variant={statusVariant[jobDetails.status]} className={cn('px-0 py-0 border-none shadow-none', statusColor[jobDetails.status])}>
                              {jobDetails.status}
                           </Badge>
                           <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {jobStatuses.map(status => (
                          <DropdownMenuItem 
                            key={status} 
                            onSelect={() => setJobDetails(prev => ({...prev, status: status}))}
                            className={cn(jobDetails.status === status && "bg-muted")}
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                </h1>
                <p className="text-muted-foreground mt-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Posted on {jobDetails.postedDate}
                </p>
            </div>
            <div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <div>
                        <span className="font-semibold text-foreground">Hiring Panel</span>
                        <p>{jobDetails.hiringPanel.join(', ')}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Briefcase} label="Openings" value={jobDetails.stats.openings} />
          <StatCard icon={Users} label="Applicants" value={jobDetails.stats.applicants} />
          <StatCard icon={UserCheck} label="In Pipeline" value={jobDetails.stats.inPipeline} />
          <StatCard icon={UserCheck} label="Hired" value={jobDetails.stats.hired} />
        </div>

        <div>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="all-candidates">All Candidates</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Matched Candidates</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {matchedCandidates.map((candidate, index) => (
                           <CandidateCard key={index} {...candidate} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="all-candidates" className="mt-6">
                   <p>All candidates list will be shown here.</p>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
