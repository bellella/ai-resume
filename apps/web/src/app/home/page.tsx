import { CTASection } from '@/components/home/sections/cta-section';
import { FeaturesSection } from '@/components/home/sections/features-section';
import { HeroSection } from '@/components/home/sections/hero-section';
import { TemplateSection } from '@/components/home/sections/template-section';
import { Parallax } from '@/components/home/sections/ui/parallax';
import { SparkleBackground } from '@/components/home/sections/ui/sparkle-background';
import { UserReviewSection } from '@/components/home/sections/user-review-section';

export default function HomePage() {
  const sectionPadding = 'py-6 md:py-12 lg:py-24';
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden w-full">
        <Parallax>
          <SparkleBackground />
        </Parallax>
        <div className={`container relative xl:px-24 py-24`}>
          <HeroSection />
        </div>
        <section className={`container relative ${sectionPadding} px-4 md:px-6`}>
          <FeaturesSection />
        </section>
        <section className={`relative ${sectionPadding} `}>
          <TemplateSection />
        </section>
        <section className={`container relative ${sectionPadding} px-4 md:px-6`}>
          <UserReviewSection />
        </section>
        <section className="w-full bg-primary text-primary-foreground">
          <CTASection />
        </section>
      </div>
    </div>
  );
}
