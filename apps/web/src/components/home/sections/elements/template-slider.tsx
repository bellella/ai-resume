'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Template, TEMPLATE_LIST } from '../../../templates/templates';
import { Card } from '../../../ui/card';

export function TemplateSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const speed = 1;
  const slidesNumber = 3;
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setOffset((prev) => {
        const container = containerRef.current;
        const totalWidth = container?.scrollWidth || 0;

        if (Math.abs(prev) >= totalWidth / slidesNumber) {
          return 0;
        }

        return prev - speed;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-6"
        style={{
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.016s linear',
        }}
      >
        {Array.from({ length: slidesNumber }, (_, idx) =>
          TEMPLATE_LIST.map((template, idx) => (
            <TemplateExampleCard key={idx} template={template} />
          ))
        )}
      </div>
    </div>
  );
}

function TemplateExampleCard({ template }: { template: Template }) {
  return (
    <Card className="rounded-sm overflow-hidden flex-shrink-0 w-48">
      <Image
        src={template.thumbnail}
        alt={template.name}
        width={194}
        height={275}
        className="object-cover"
      />
    </Card>
  );
}
