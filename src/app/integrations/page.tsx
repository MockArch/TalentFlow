
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Slack } from 'lucide-react';

const integrations = [
    { name: 'Slack', description: 'Get interview reminders and candidate updates in your Slack channels.', icon: Slack, connected: true },
    { name: 'Google Calendar', description: 'Automatically sync interviews with your Google Calendar.', icon: 'https://www.google.com/images/icons/product/calendar-32.png', connected: true },
    { name: 'Greenhouse', description: 'Sync candidate data and job postings with your Greenhouse account.', icon: Briefcase, connected: false },
];


export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Integrations</h1>
          <p className="text-muted-foreground">
            Connect TalentFlow with your favorite tools and services.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map(integration => (
                 <Card key={integration.name}>
                    <CardHeader className="flex flex-row items-start justify-between">
                       <div>
                            <CardTitle className="flex items-center gap-3">
                                {typeof integration.icon === 'string' ? <img src={integration.icon} alt={`${integration.name} logo`} className="h-6 w-6" /> : <integration.icon className="h-6 w-6" />}
                                <span>{integration.name}</span>
                            </CardTitle>
                            <CardDescription className="mt-2">{integration.description}</CardDescription>
                       </div>
                    </CardHeader>
                    <CardContent>
                       <Button variant={integration.connected ? 'secondary' : 'default'} className="w-full">
                         {integration.connected ? 'Disconnect' : 'Connect'}
                       </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
