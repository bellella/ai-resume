import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function CTASection() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Create Your Professional Resume?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of job seekers who have found success with ResumeAI.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/resumes/new">
              <Button size="lg" variant="accent" className="gap-1">
                <FileText className="h-4 w-4" />
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
