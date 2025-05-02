'use client';

import { Clock, Zap } from 'lucide-react';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export function AnimatedCards() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-2 bg-primary/10 rounded-full">
                {i === 0 && <Sparkles className="h-6 w-6 text-primary" />}
                {i === 1 && <Zap className="h-6 w-6 text-primary" />}
                {i === 2 && <Clock className="h-6 w-6 text-primary" />}
              </div>
              <h3 className="text-xl font-bold">
                {['AI Content Generation', 'Professional Templates', 'Quick & Easy'][i]}
              </h3>
              <p className="text-muted-foreground">
                {
                  [
                    'Let our AI help you write compelling descriptions and summaries based on your experience.',
                    'Choose from dozens of professionally designed templates to make your resume stand out.',
                    'Create a professional resume in minutes, not hours, with our intuitive interface.',
                  ][i]
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );
}
