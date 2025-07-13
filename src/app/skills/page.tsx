import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, Lightbulb, CheckCircle2 } from 'lucide-react';

const generatedSkills = [
  "React & Next.js",
  "TypeScript",
  "State Management (Redux/Zustand)",
  "Tailwind CSS & Component Libraries",
  "Testing (Jest/RTL)",
  "REST API Integration",
  "Version Control (Git)",
  "Performance Optimization"
];

const generatedQuestions = [
  "How do you handle state management in a large-scale React application?",
  "Describe the difference between server components and client components in Next.js.",
  "Explain your process for optimizing the performance of a web application.",
  "How would you ensure the accessibility of a new component you've built?",
  "Walk me through a complex UI component you have built and the challenges you faced."
];


export default function SkillsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Skill Identifier</h1>
          <p className="text-muted-foreground">
            Generate key skills and interview questions for any role.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                <span>Role Input</span>
            </CardTitle>
            <CardDescription>
                Enter a job title to generate skills and questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Input placeholder="e.g., Senior Frontend Developer" className="flex-grow" />
                <Button className="w-full sm:w-auto">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate
                </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Identified Skills</span>
                </CardTitle>
                <CardDescription>
                    Common competencies required for the role.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {generatedSkills.map(skill => (
                        <li key={skill} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">{skill}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 18h.01"/><path d="M15.5 11.5c0 2.2-1.8 4-4 4-1.2 0-2.3-.5-3-1.4"/><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/><path d="m11 7.5 7.1 2.5"/></svg>
                    <span>Suggested Questions</span>
                </CardTitle>
                <CardDescription>
                    Questions to assess the identified skills.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-3">
                    {generatedQuestions.map(q => (
                       <li key={q} className="text-sm">{q}</li>
                    ))}
                </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
