
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
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Briefcase, Star, MessageSquare, UserCheck, Mail, Phone, MapPin, Award, Tag, ThumbsUp, ThumbsDown, X, Building, CheckCircle, CircleX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { candidates as allCandidates } from '@/lib/data';
import type { Candidate } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const jobDetailsData = {
  title: 'Senior Frontend Developer',
  status: 'Open',
  postedDate: 'June 29th, 2025',
  hiringPanel: ['John Smith', 'Jane Doe'],
  stats: {
    openings: 2,
    applicants: 12,
    inPipeline: 5,
    hired: 1,
  },
};

type MatchedCandidate = Candidate & { matchScore: number; topSkills: string[] };

const stageColor: { [key: string]: string } = {
  Interviewing: 'bg-purple-100 text-purple-800',
  'Phone Screen': 'bg-blue-100 text-blue-800',
  Applied: 'bg-gray-100 text-gray-800',
  New: 'bg-blue-100 text-blue-800',
  Screening: 'bg-yellow-100 text-yellow-800',
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

const CandidateCard = ({ candidate, onViewDetails }: { candidate: MatchedCandidate, onViewDetails: (c: Candidate) => void }) => (
  <Card className="flex flex-col">
    <CardContent className="p-6 flex flex-col flex-grow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
                <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person" />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-bold text-lg">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{candidate.role}</p>
            </div>
        </div>
        <Badge variant="secondary" className={cn('whitespace-nowrap font-medium', stageColor[candidate.stage])}>
            {candidate.stage}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4 flex-grow">
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Match Score</span>
            </div>
            <span className="font-semibold">{candidate.matchScore}%</span>
        </div>
        <Progress value={candidate.matchScore} className="h-1.5" />
      </div>

       <div className="space-y-2 mb-6">
        <p className="text-sm text-muted-foreground">Top Skills</p>
        <div className="flex flex-wrap gap-2">
            {candidate.topSkills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="font-normal">{skill}</Badge>
            ))}
            {candidate.qualifications.split(',').length > 3 && <Badge variant="secondary" className="font-normal">+{candidate.qualifications.split(',').length - 3}</Badge>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => onViewDetails(candidate)}>View Details</Button>
        <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CandidateDetailsSheet = ({ candidate, open, onOpenChange }: { candidate: Candidate | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
  if (!candidate) return null;
  
  const candidateDetails = {
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    experience: '5 years',
    education: 'BS Computer Science, Stanford University',
    workExperience: [
      { role: 'Frontend Developer', company: 'TechSolutions Inc.', icon: Building },
      { role: 'Junior Frontend Developer', company: 'WebInnovators Co.', icon: Building },
    ],
    tags: ['Top-Talent', 'React-Pro'],
    skills: candidate.qualifications.split(', '),
    interviews: [{ title: 'Technical', panelists: 'John Smith, Jane Doe', date: 'Jul 15, 2025 - 1:52 PM' }],
    feedback: [
      { name: 'Jane Doe', comment: 'Excellent technical skills and great communication. Strong fit for the team.', status: 'Positive', icon: ThumbsUp },
      { name: 'John Smith', comment: 'Deep understanding of React and our tech stack.', status: 'Positive', icon: ThumbsUp },
    ],
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 overflow-y-auto">
        <div className="p-6 relative">
          <SheetHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border">
                <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person" />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl">{candidate.name}</SheetTitle>
                <p className="text-muted-foreground">{candidate.role}</p>
              </div>
            </div>
            <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full absolute top-4 right-4">
                    <X className="h-5 w-5 text-muted-foreground" />
                </Button>
            </SheetClose>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-muted-foreground mt-6">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <span>{candidate.email}</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <span>{candidateDetails.phone}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> <span>{candidateDetails.location}</span></div>
            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> <span>{candidateDetails.experience}</span></div>
            <div className="flex items-center gap-2 col-span-2"><Award className="h-4 w-4" /> <span>{candidateDetails.education}</span></div>
          </div>
        </div>
        
        <Separator />
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Briefcase className="h-5 w-5" /> Work Experience</h3>
            <Accordion type="single" collapsible className="w-full">
              {candidateDetails.workExperience.map((exp, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <exp.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-sm">{exp.role}</p>
                        <p className="text-xs text-muted-foreground text-left">{exp.company}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    More details about this role can be added here.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Tag className="h-5 w-5" /> Tags</h3>
            <div className="flex flex-wrap items-center gap-2">
              {candidateDetails.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm py-1">
                  {tag}
                  <button className="ml-1.5 focus:outline-none"><X className="h-3 w-3"/></button>
                </Badge>
              ))}
              <div className="flex gap-2 flex-grow">
                 <Input placeholder="Add a tag..." className="h-8 flex-grow" />
                 <Button size="sm">Add</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidateDetails.skills.map(skill => (
                <Badge key={skill} variant="outline" className="font-normal">{skill}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Scheduled Interviews</h3>
            {candidateDetails.interviews.map((interview, index) => (
               <div key={index} className="p-3 rounded-md bg-muted flex items-center justify-between">
                 <div>
                    <p className="font-medium text-sm">{interview.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {interview.panelists}</p>
                 </div>
                 <p className="text-sm font-medium">{interview.date}</p>
              </div>
            ))}
          </div>
          
          <div>
             <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Hiring Manager Feedback</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Add Feedback</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Provide Feedback</DialogTitle>
                        <DialogDescription>
                            Share your thoughts on {candidate.name}. Your feedback is crucial for making the right hiring decision.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            <Textarea placeholder="Enter your detailed feedback here..." rows={6} />
                            <RadioGroup defaultValue="positive">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="positive" id="r-positive" />
                                    <Label htmlFor="r-positive" className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Positive</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="negative" id="r-negative" />
                                    <Label htmlFor="r-negative" className="flex items-center gap-2"><CircleX className="h-4 w-4 text-red-600" /> Negative</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button>Submit Feedback</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
             </div>
             <div className="space-y-4">
                {candidateDetails.feedback.map((fb, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${fb.name.split(' ').map(n=>n[0]).join('')}`} alt={fb.name} data-ai-hint="person" />
                        <AvatarFallback>{fb.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                       <div className="flex items-center justify-between">
                         <p className="font-semibold text-sm">{fb.name}</p>
                         <Badge variant={fb.status === 'Positive' ? 'secondary' : 'destructive'} className={cn(fb.status === 'Positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', "font-medium")}>
                          <fb.icon className="h-3 w-3 mr-1" />
                          {fb.status}
                        </Badge>
                       </div>
                       <p className="text-sm text-muted-foreground mt-1">{fb.comment}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
};


export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [jobDetails, setJobDetails] = React.useState(jobDetailsData);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [matchedCandidates, setMatchedCandidates] = React.useState<MatchedCandidate[]>([]);
  
  React.useEffect(() => {
    // This is just mock data generation. In a real app, you'd fetch this.
    const candidatesToProcess = [allCandidates[0], allCandidates[6], allCandidates[2], allCandidates[4]];
    const processedCandidates = candidatesToProcess.map(c => ({
        ...c, 
        matchScore: Math.floor(Math.random() * (98 - 88 + 1)) + 88, 
        topSkills: c.qualifications.split(', ').slice(0,3)
    }));
    setMatchedCandidates(processedCandidates);
  }, []);

  const handleSelectAll = (checked: boolean | string) => {
    if (checked === true) {
      setSelectedRows(allCandidates.map(c => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (rowId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, rowId]);
    } else {
      setSelectedRows(prev => prev.filter(id => id !== rowId));
    }
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsSheetOpen(true);
  };

  const isAllSelected = selectedRows.length > 0 && selectedRows.length === allCandidates.length;
  const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-muted-foreground mb-2">Job Details</p>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className='space-y-2'>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    {jobDetails.title}
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Badge className="text-sm font-medium cursor-pointer" variant={jobDetails.status === 'Open' ? 'default' : jobDetails.status === 'On Hold' ? 'secondary' : 'destructive'}>{jobDetails.status}</Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => setJobDetails(prev => ({...prev, status: 'Open'}))}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setJobDetails(prev => ({...prev, status: 'On Hold'}))}>On Hold</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setJobDetails(prev => ({...prev, status: 'Closed'}))}>Closed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </h1>
                <p className="text-muted-foreground flex items-center gap-2">
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
                    <TabsTrigger value="all-candidates">All Candidates ({allCandidates.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Matched Candidates</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {matchedCandidates.map((candidate) => (
                           <CandidateCard key={candidate.id} candidate={candidate} onViewDetails={handleViewDetails} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="all-candidates" className="mt-6">
                   <Card>
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        {selectedRows.length > 0 ? (
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{selectedRows.length} selected</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">Change Stage <MoreHorizontal className="ml-2 h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Applied</DropdownMenuItem>
                                <DropdownMenuItem>Screening</DropdownMenuItem>
                                <DropdownMenuItem>Interviewing</DropdownMenuItem>
                                <DropdownMenuItem>Offer</DropdownMenuItem>
                                <DropdownMenuItem>Hired</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" size="sm">Send Message</Button>
                            <Button variant="destructive" size="sm">Reject</Button>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Select candidates to perform bulk actions.</p>
                        )}
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Checkbox
                                checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
                                onCheckedChange={handleSelectAll}
                                aria-label="Select all"
                              />
                            </TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Applied Date</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allCandidates.map((candidate) => (
                            <TableRow key={candidate.id} data-state={selectedRows.includes(candidate.id) && "selected"}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedRows.includes(candidate.id)}
                                  onCheckedChange={(checked) => handleRowSelect(candidate.id, !!checked)}
                                  aria-label="Select row"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person" />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={cn(stageColor[candidate.stage])}>{candidate.stage}</Badge>
                              </TableCell>
                              <TableCell>{candidate.appliedDate}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewDetails(candidate)}>View Details</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSub>
                                      <DropdownMenuSubTrigger>Change Stage</DropdownMenuSubTrigger>
                                      <DropdownMenuSubContent>
                                        <DropdownMenuItem>Applied</DropdownMenuItem>
                                        <DropdownMenuItem>Screening</DropdownMenuItem>
                                        <DropdownMenuItem>Interviewing</DropdownMenuItem>
                                        <DropdownMenuItem>Offer</DropdownMenuItem>
                                        <DropdownMenuItem>Hired</DropdownMenuItem>
                                      </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                   </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
      <CandidateDetailsSheet candidate={selectedCandidate} open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </DashboardLayout>
  );
}

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
