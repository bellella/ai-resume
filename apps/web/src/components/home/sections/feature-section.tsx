import { AnimatedCards } from "./elements/animated-cards";

export function FeaturesSection() {
  return (
    <div className="container relative py-12 md:py-24 lg:py-28 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Features that Make the Difference
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our AI-powered platform helps you create professional resumes that stand out from the
            crowd.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <AnimatedCards />
      </div>
    </div>
  );
}
