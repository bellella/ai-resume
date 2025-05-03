import { Parallax } from '@/components/apps/parallax';
import { SparkleBackground } from '@/components/apps/sparkle-background';
import { CTASection } from '@/components/home/sections/CTASection';
import { FeaturesSection } from '@/components/home/sections/FeaturesSection';
import { HeroSection } from '@/components/home/sections/HeroSection';
import { ProfessionalTemplatesSection } from '@/components/home/sections/ProfessionalTemplatesSection';
import { UserTestimonialsSection } from '@/components/home/sections/UserTestimonialsSection';

export default function HomePage() {
  const sectionPadding = 'py-6 md:py-12 lg:py-24';
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden w-full">
        <Parallax speed={70}>
          <SparkleBackground />
        </Parallax>
        <div className={`container relative xl:px-24 py-24`}>
          <HeroSection />
        </div>
        <section className={`container relative ${sectionPadding} px-4 md:px-6`}>
          <FeaturesSection />
        </section>
        <section className={`relative ${sectionPadding} `}>
          <ProfessionalTemplatesSection />
        </section>
        <section className={`container relative ${sectionPadding} px-4 md:px-6`}>
          <UserTestimonialsSection />
        </section>
        <section className="w-full bg-primary text-primary-foreground">
          <CTASection />
        </section>
      </div>
    </div>
  );
}
