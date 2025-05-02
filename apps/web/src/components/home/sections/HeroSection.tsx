import { TypingText } from '@/components/apps/typing-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center justify-center">
      <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
        <div className="space-y-2">
          <Badge variant="secondary" className="inline-flex mb-2">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>
          <TypingText text="Create Professional Resumes with AI" />
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Build standout resumes in minutes with our AI assistant. Get personalized suggestions,
            professional templates, and expert guidance.
          </p>
        </div>
        <Link href="/resumes/new">
          <Button size="lg" className="gap-1">
            <FileText className="h-4 w-4" />
            Create Resume
          </Button>
        </Link>
      </div>
      <div className="mx-auto relative">
        <div className="relative aspect-a4 w-[250px] m:w-[300px] lg:w-[400px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur-xl"></div>
          <div className="absolute inset-4 bg-card rounded-lg shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="h-8 w-32 bg-muted rounded mb-4"></div>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-muted rounded mb-6"></div>
              <div className="h-20 w-full bg-muted rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-muted rounded mb-6"></div>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-muted rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-muted rounded mb-6"></div>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
