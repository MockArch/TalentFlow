
"use client"

import * as React from 'react';
import { addMonths, subMonths, format, parseISO } from 'date-fns';
import {
  Briefcase,
  Users,
  Smile,
  CalendarDays,
  Bot,
  Send,
  UserPlus,
  CalendarPlus,
  BarChart,
  MessageSquare,
  UserCheck,
  FileText,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { interviews as allInterviews } from '@/lib/data';
import type { Interview } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const quickActions = [
  { label: 'Add Candidate', icon: UserPlus, href: "/candidates" },
  { label: 'Schedule Interview', icon: CalendarPlus, href: "/interviews" },
  { label: 'Analyze Skills', icon: BarChart, href: "/skills" },
];

const recentActivity = [
  {
    icon: MessageSquare,
    text: 'Feedback added for Michael Chen by Alice Williams.',
    time: '2 hours ago',
  },
  {
    icon: UserCheck,
    text: 'New candidate, David Lee, matched for DevOps Engineer role.',
    time: '1 day ago',
  },
  {
    icon: FileText,
    text: 'Interview scheduled with Sarah Johnson.',
    time: '1 day ago',
  },
  {
    icon: TrendingUp,
    text: 'Emily Rodriguez moved to Screening stage.',
    time: '2 days ago',
  },
];

const upcomingInterviews = allInterviews
    .filter(i => i.status === 'Scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
    .map(interview => ({
        date: format(parseISO(interview.date), 'dd'),
        month: format(parseISO(interview.date), 'MMM'),
        name: interview.candidate.name,
        role: interview.role,
        time: interview.time,
        interviewer: interview.panelists.map(p => p.name).join(', ')
    }));


const EventIndicator = ({ count }: { count: number }) => (
    <div className="absolute top-0.5 right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
        {count}
    </div>
);

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};


export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! How can I help you today? You can ask me to find candidates, summarize resumes, or schedule interviews.",
    },
  ]);
  const [chatInput, setChatInput] = React.useState('');
  const [isAiResponding, setIsAiResponding] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiResponding) return;

    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { role: 'user', content: chatInput },
    ];
    setChatMessages(newMessages);
    setChatInput('');
    setIsAiResponding(true);

    setTimeout(() => {
      setChatMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            "This is a dummy response. The AI functionality is not yet implemented.",
        },
      ]);
      setIsAiResponding(false);
    }, 1500);
  };
  
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages]);


  const interviewCountsByDay = React.useMemo(() => {
    const counts: { [day: string]: number } = {};
    allInterviews.forEach(interview => {
      const interviewDate = format(parseISO(interview.date), 'yyyy-MM-dd');
      counts[interviewDate] = (counts[interviewDate] || 0) + 1;
    });
    return counts;
  }, []);

  const interviewsByDay = React.useMemo(() => {
    const groups: { [day: string]: Interview[] } = {};
    allInterviews.forEach(interview => {
        const interviewDate = format(parseISO(interview.date), 'yyyy-MM-dd');
        if (!groups[interviewDate]) {
            groups[interviewDate] = [];
        }
        groups[interviewDate].push(interview);
    });
    return groups;
  }, []);


  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <DashboardLayout>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s a quick overview of your hiring pipeline.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Open Jobs
              </CardTitle>
              <Briefcase className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+5 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Candidates
              </CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+10 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Satisfaction
              </CardTitle>
              <Smile className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
               <p className="text-xs text-muted-foreground">Candidates feel satisfied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interviews
              </CardTitle>
              <CalendarDays className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
               <p className="text-xs text-muted-foreground">+6 scheduled this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
             <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Your intelligent recruitment partner.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between gap-4">
                 <ScrollArea className="flex-grow h-64 pr-4" ref={scrollAreaRef}>
                   <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                          {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src="https://placehold.co/40x40.png" alt="AI Avatar" data-ai-hint="bot" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          )}
                           <div className={`rounded-lg p-3 text-sm ${message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                <p>{message.content}</p>
                           </div>
                           {message.role === 'user' && (
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="person avatar" />
                                <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      {isAiResponding && (
                         <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src="https://placehold.co/40x40.png" alt="AI Avatar" data-ai-hint="bot" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg p-3 bg-muted flex items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        </div>
                      )}
                    </div>
                </ScrollArea>
                <form onSubmit={handleChatSubmit} className="relative">
                  <Input
                    placeholder="e.g., 'Find me a senior react developer...'"
                    className="pr-12 h-12"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isAiResponding}
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90" disabled={isAiResponding || !chatInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
             <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action) => (
                  <Button key={action.label} variant="outline" className="w-full justify-start text-muted-foreground hover:bg-muted/80">
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <activity.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Interview Calendar</CardTitle>
                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        className="p-0"
                        classNames={{
                          root: 'p-3',
                          months: 'space-y-4',
                          month: 'space-y-4',
                          caption_label: 'text-base font-medium',
                          head_row: 'flex justify-between w-full mb-2',
                          head_cell: 'text-muted-foreground rounded-md w-full font-normal text-sm',
                          row: 'flex w-full mt-2 justify-between',
                          cell: 'text-center text-sm p-0 relative',
                          day: 'w-full h-10',
                          day_selected: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-full',
                          day_today: 'bg-accent text-accent-foreground rounded-full',
                          day_outside: 'text-muted-foreground opacity-50',
                        }}
                        components={{
                            DayContent: ({ date: d }) => {
                                const formattedDate = format(d, 'yyyy-MM-dd');
                                const interviewCount = interviewCountsByDay[formattedDate];
                                const interviewsForDay = interviewsByDay[formattedDate];

                                const dayContent = (
                                    <div className="relative flex justify-center items-center h-10 w-10">
                                        <span>{d.getDate()}</span>
                                        {interviewCount > 0 && <EventIndicator count={interviewCount} />}
                                    </div>
                                );

                                if (interviewsForDay && interviewsForDay.length > 0) {
                                    return (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                {dayContent}
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium leading-none">
                                                            Interviews for {format(d, 'MMMM d, yyyy')}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {interviewsForDay.length} scheduled interview(s).
                                                        </p>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        {interviewsForDay.map((interview) => (
                                                            <div key={interview.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                                                <div className="grid gap-1">
                                                                    <p className="text-sm font-medium leading-none">
                                                                        {interview.candidate.name}
                                                                    </p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {interview.time} - {interview.role}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }

                                return dayContent;
                            },
                        }}
                     />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                    <CardDescription>Based on your calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                    <div key={`${interview.name}-${index}`} className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-muted aspect-square h-14">
                            <span className="text-xs font-semibold text-muted-foreground">{interview.month}</span>
                            <span className="text-lg font-bold">{interview.date}</span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{interview.name}</p>
                            <p className="text-sm text-muted-foreground">{interview.role}</p>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{interview.time}</span>
                                <Users className="h-3 w-3 ml-2" />
                                <span>{interview.interviewer}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
