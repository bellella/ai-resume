'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function UserTestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section className="container relative px-4 md:px-6 py-12 md:py-24 lg:py-28">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Thousands of job seekers have found success with our platform.
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
      >
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, starIndex) => (
                  <motion.svg
                    key={starIndex}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                            opacity: 1,
                            transition: {
                              delay: starIndex * 0.1,
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                            },
                          }
                        : {}
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "ResumeAI helped me create a professional resume that landed me my dream job. The AI
                suggestions were spot on!"
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">User {i}</p>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
