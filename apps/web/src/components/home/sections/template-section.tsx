import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TemplateSlider } from './elements/template-slider';

export function TemplateSection() {
  return (
    <div className="py-12 md:py-24 lg:py-28">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Professional Templates
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose from a variety of professionally designed templates to make your resume stand
            out.
          </p>
        </div>
      </div>
      <div className="pt-12">
        <TemplateSlider />
        <div className="flex justify-center pt-12">
          <Link href="/resumes/new">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
