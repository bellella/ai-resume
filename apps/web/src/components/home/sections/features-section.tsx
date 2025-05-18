'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Sparkle, Star, Upload } from 'lucide-react';

const features = [
  {
    icon: <Sparkle className="w-6 h-6 text-primary" />,
    title: 'AI Resume Assistant',
    description: 'Generate summaries and achievements with the help of AI.',
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: 'Live Preview & Styling',
    description: 'Edit fonts, colors, and layout in real-time.',
  },
  {
    icon: <Upload className="w-6 h-6 text-primary" />,
    title: 'Auto-Fill from File',
    description: 'Upload your resume (PDF or Word) and convert it into editable fields.',
  },
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    title: 'Resume Evaluation',
    description: 'Get instant feedback and quality scoring for your resume.',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-28">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Powerful Features</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Explore tools that make resume creation fast, intelligent, and delightful.
        </p>
      </div>

      <div
        ref={ref}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: 'easeOut',
              type: 'tween',
            }}
          >
            <Card className="h-full">
              {' '}
              <CardContent className="p-6 space-y-4 text-center">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
