import { DashboardLayout } from '@/components/dashboard-layout';
import { interviews, candidates, users as panelists } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Scheduled: 'default',
  Completed: 'secondary',
  Canceled: 'destructive',
};

const statusColor: { [key: string]: string } = {
    Scheduled: 'bg-blue-500 text-white',
};


export default function InterviewsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold font-headline">Interviews</h1>
            <p className="text-muted-foreground">
              Schedule and track all your interviews.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
                <DialogDescription>
                  Fill out the details to schedule an interview.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate">Candidate</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="e.g. Senior Frontend Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panelists">Panelists</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select panelists" />
                    </SelectTrigger>
                    <SelectContent>
                      {panelists.map((p) => (
                        <SelectItem key={p.email} value={p.email}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
               <Button type="submit" className="w-full">Confirm Interview</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <Card key={interview.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{interview.candidate.name}</CardTitle>
                    <Badge variant={statusVariant[interview.status]} className={statusColor[interview.status]}>
                        {interview.status}
                    </Badge>
                </div>
                <CardDescription>{interview.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                    <p>{interview.date} at {interview.time}</p>
                </div>
                <div className="mt-4">
                    <h4 className="text-sm font-medium">Panelists</h4>
                    <div className="mt-2 flex -space-x-2 overflow-hidden">
                        {interview.panelists.map(p => (
                            <Avatar key={p.email} className="h-8 w-8 border-2 border-card">
                                <AvatarImage src={p.avatar} alt={p.name} data-ai-hint="person" />
                                <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reschedule</Button>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
