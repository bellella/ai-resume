import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FileText, Pencil, Download, Share, Trash } from 'lucide-react';
import { ResumeItem } from '@ai-resume/types';

interface ResumeCardProps {
  resume: ResumeItem;
}

function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Link href={`/resumes/${resume.id}`} key={resume.id}>
      <Card className="overflow-hidden">
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
              <h3 className="font-semibold">{resume.title}</h3>
              <p className="text-sm text-muted-foreground">
                Created on: {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          <Link href={`/resume/${resume.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-1">
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3 w-3" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share className="h-3 w-3" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive gap-1">
            <Trash className="h-3 w-3" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ResumeCard; 