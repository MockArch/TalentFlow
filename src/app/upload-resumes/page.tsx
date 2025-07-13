
'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertTriangle, Target, Award } from 'lucide-react';

const aiFeatures = [
    {
        icon: FileText,
        title: 'Smart Parsing',
        description: 'Extracts contact info, skills, experience, and education with high accuracy.',
    },
    {
        icon: AlertTriangle,
        title: 'Fraud Detection',
        description: 'Identifies inconsistencies and suspicious patterns in resumes.',
    },
    {
        icon: Target,
        title: 'Skill Matching',
        description: 'Matches candidates to job requirements with semantic understanding.',
    },
    {
        icon: Award,
        title: 'Quality Scoring',
        description: 'Rates resume quality and completeness for better filtering.',
    },
];

export default function UploadResumesPage() {
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFiles(Array.from(event.dataTransfer.files));
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleUploadClick = () => {
    if (files.length > 0) {
      // In a real app, you would handle the file upload here.
      // For now, we can just log the files and clear them.
      console.log('Uploading files:', files);
      setFiles([]);
    } else if (fileInputRef.current) {
       fileInputRef.current.click();
    }
  };

  return (
    <DashboardLayout>
       <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Upload Resumes</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="text-center">
                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                 </div>
                 <CardTitle className="mt-4">Upload Resumes</CardTitle>
                 <CardDescription>
                    Drag and drop resumes or click to browse. AI will automatically parse and categorize them.
                 </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/80 mb-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-semibold">Choose files or drag them here</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports PDF, DOC, DOCX files up to 10MB each
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                 {files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Files:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {files.map((file, i) => (
                        <li key={i}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button size="lg" className="w-full" onClick={handleUploadClick}>Upload Files</Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <Card className="bg-muted/50 border-none shadow-none h-full">
                 <CardHeader>
                    <CardTitle>AI Processing Features</CardTitle>
                    <CardDescription>
                        Our AI analyzes every resume for key insights, ensuring you find the best candidates faster.
                    </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {aiFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                <feature.icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <h4 className="font-semibold">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                 </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
