'use client';

import { useAuth } from '@/hooks/useAuth';
import type React from 'react';
import { useState } from 'react';

import { ActionButtons } from '@/components/ui/action-buttons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { fetchResume } from '@/lib/api/resume';
import { ResumeJson } from '@ai-resume/types';
import { useQuery } from '@tanstack/react-query';
import { Coins, Download, Eye, Save, Settings, Share } from 'lucide-react';
import Link from 'next/link';
import DefaultTemplate from '@/components/templates/default';
import ModernTemplate from '@/components/templates/modern';

export default function ResumeEditorPage({ params }: { params: { id: string } }) {
  const { isLoading } = useAuth();
  const [isLoadingResume, setIsLoadingResume] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('default');

  const { data: resume } = useQuery({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

  const templates = [
    { id: 'default', name: 'Default Template', component: DefaultTemplate },
    { id: 'modern', name: 'Modern Template', component: ModernTemplate },
    // Add more templates here
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const SelectedTemplateComponent: React.ComponentType<{ data: ResumeJson }> | undefined =
    templates.find((t) => t.id === selectedTemplate)?.component;

  if (isLoading || isLoadingResume) {
    return <div>Loading...</div>;
  }

  if (!resume) {
    return <div>이력서를 찾을 수 없습니다</div>;
  }

  return (
    <Container className="py-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          title={resume.title}
          description={`Last edited: ${new Date().toLocaleDateString()}`}
        >
          <ActionButtons>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export PDF
              <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary">
                5 <Coins className="h-3 w-3 ml-0.5" />
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Link href={`/resume/${params.id}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </ActionButtons>
        </PageHeader>

        <div className="flex gap-6">
          {/* Template List */}
          <div className="w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Choose a template for your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="p-4">
                        <h3 className="font-semibold">{template.name}</h3>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Renderer */}
          <div className="w-3/4">
            {SelectedTemplateComponent && <SelectedTemplateComponent data={resume.resumeJson} />}
          </div>
        </div>
      </div>
    </Container>
  );
}

function Inut({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
