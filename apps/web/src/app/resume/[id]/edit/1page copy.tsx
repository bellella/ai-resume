'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

import Editor from '@/components/resumes/Editor';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Coins, Download, Eye, FileText, Save, Settings, Share } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchResume } from '@/lib/api/resume';

export default function ResumeEditorPage({ params }: { params: { id: string } }) {
  const { isLoading } = useAuth();
  const [isLoadingResume, setIsLoadingResume] = useState(true);

  const { data: resume } = useQuery({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

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

        <Editor initialData={resume.html} />

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Choose a template for your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                    <div className="h-full w-full bg-card rounded-md p-4">
                      <div className="h-6 w-24 bg-muted rounded mb-2"></div>
                      <div className="h-3 w-full bg-muted rounded mb-1"></div>
                      <div className="h-3 w-3/4 bg-muted rounded mb-3"></div>
                      <div className="h-12 w-full bg-muted rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-muted rounded"></div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Template {i}</h3>
                        <p className="text-sm text-muted-foreground">Professional</p>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
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
