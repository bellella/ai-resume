import { TemplateId, TEMPLATES } from '@/components/templates/templates';
import { Card, CardContent } from '@/components/ui/card';
import { ResumeItem } from '@ai-resume/types';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ResumeCardProps {
  resume: ResumeItem;
}

function ResumeCard({ resume }: ResumeCardProps) {
  const image = TEMPLATES[resume.templateId as TemplateId]?.thumbnail;
  return (
    <Link href={`/resumes/${resume.id}`} key={resume.id}>
      <Card className="overflow-hidden aspect-a4 flex flex-col">
        <div className="flex-1 overflow-hidden">
          {image ? (
            <Image src={image} alt={resume.title} width={500} height={100} />
          ) : (
            <div className="h-full bg-gradient-to-br from-primary/20 to-primary/5 p-4">
              <div className="h-full w-full bg-card rounded-md p-4">
                <div className="h-6 w-24 bg-muted rounded mb-2"></div>
                <div className="h-3 w-full bg-muted rounded mb-1"></div>
                <div className="h-3 w-3/4 bg-muted rounded mb-3"></div>
                <div className="h-12 w-full bg-muted rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-muted rounded"></div>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{resume.title}</h3>
              <p className="text-sm text-muted-foreground">
                Last updated on: {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ResumeCard;
