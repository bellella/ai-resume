'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Template, TEMPLATE_LIST } from '../templates/templates';
import { Card, CardContent } from '../ui/card';
export function TemplateSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const speed = 1; // px per frame

    const animate = () => {
      setOffset((prev) => {
        const container = containerRef.current;
        const firstChild = container?.children[0] as HTMLElement;

        if (firstChild && -prev >= firstChild.offsetWidth) {
          container?.appendChild(firstChild);
          return prev + firstChild.offsetWidth;
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
        style={{ transform: `translateX(${offset}px)` }}
      >
        {TEMPLATE_LIST.map((template, idx) => (
          <TemplateExampleCard key={idx} template={template} />
        ))}
        {TEMPLATE_LIST.map((template, idx) => (
          <TemplateExampleCard key={idx + 2} template={template} />
        ))}
      </div>
    </div>
  );
}

function TemplateExampleCard({ template }: { template: Template }) {
  return (
    <Card className="rounded-sm overflow-hidden">
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
