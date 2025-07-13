
"use client"

import * as React from 'react';
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

const quickActions = [
  { label: 'Add Candidate', icon: UserPlus },
  { label: 'Schedule Interview', icon: CalendarPlus },
  { label: 'Analyze Resume', icon: BarChart },
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

const upcomingInterviews = [
    { date: "14", month: "Jul", name: "James Brown", role: "Cultural Fit Interview", time: "1:52 PM", interviewer: "Sarah Lee" },
    { date: "15", month: "Jul", name: "Sarah Johnson", role: "Technical Interview", time: "1:52 PM", interviewer: "John Smith, Jane Doe" },
    { date: "16", month: "Jul", name: "Linda Smith", role: "Technical Interview", time: "1:52 PM", interviewer: "David Green" },
    { date: "18", month: "Jul", name: "Emily Rodriguez", role: "HR Screening Interview", time: "1:52 PM", interviewer: "HR Team" },
    { date: "21", month: "Jul", name: "Alex Ray", role: "Final Interview", time: "1:52 PM", interviewer: "Alice Williams, Hiring Manager" },
];

const EventIndicator = () => <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary" />;

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2025-07-13'));
  const interviewDates = [14, 15, 16, 18, 21];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Open Jobs
              </CardTitle>
              <Briefcase className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Panelists
              </CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Candidate Satisfaction
              </CardTitle>
              <Smile className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Interviews
              </CardTitle>
              <CalendarDays className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
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
                 <div className="flex items-start gap-3 rounded-lg bg-muted p-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="AI Avatar" data-ai-hint="bot" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <p className="text-sm pt-1">
                        Hello! How can I help you today? You can ask me to find candidates, summarize resumes, or schedule interviews.
                    </p>
                </div>
                <div className="relative">
                  <Input
                    placeholder="e.g., 'Find me a senior react developer...'"
                    className="pr-12 h-12"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-gray-700 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
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
                             <Button variant="outline" size="icon" className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0"
                        month={new Date('2025-07-01')}
                        classNames={{
                          head_cell: 'w-full font-normal text-sm',
                          cell: 'w-full text-center text-sm p-0 relative',
                          day: 'w-full h-10',
                          day_selected: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-md',
                          day_today: 'bg-accent text-accent-foreground rounded-md',
                          day_outside: 'text-muted-foreground opacity-50',
                        }}
                        components={{
                            DayContent: ({ date: d, ...props }) => {
                                const isInterviewDay = interviewDates.includes(d.getDate()) && d.getMonth() === 6 && d.getFullYear() === 2025;
                                return (
                                    <div className="relative flex justify-center items-center h-10 w-full">
                                        <span>{d.getDate()}</span>
                                        {isInterviewDay && <EventIndicator />}
                                    </div>
                                );
                            },
                        }}
                     />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                    <div key={interview.name} className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-muted">
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
