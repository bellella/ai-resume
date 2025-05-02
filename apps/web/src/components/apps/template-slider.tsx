'use client';

import { useEffect, useRef, useState } from 'react';

const templates = [1, 2, 3];

export function TemplateSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  // 애니메이션 루프
  useEffect(() => {
    let animationFrame: number;
    const speed = 1; // px per frame

    const animate = () => {
      setOffset((prev) => {
        const container = containerRef.current;
        const firstChild = container?.children[0] as HTMLElement;

        if (firstChild && -prev >= firstChild.offsetWidth) {
          // 왼쪽으로 빠져나간 슬라이드를 맨 뒤로 이동
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
        {templates.map((i, idx) => (
          <Card key={idx} index={i} />
        ))}
        {templates.map((i, idx) => (
          <Card key={idx + templates.length} index={i} />
        ))}
      </div>
    </div>
  );
}

function Card({ index }: { index: number }) {
  return (
    <div className="min-w-[300px] flex-shrink-0 rounded-lg bg-background shadow-lg">
      <div className="h-[300px] bg-gradient-to-br from-primary/20 to-primary/5 p-4">
        <div className="h-full w-full bg-card rounded-md p-4">
          <div className="h-8 w-32 bg-muted rounded mb-4" />
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-3/4 bg-muted rounded mb-6" />
          <div className="h-20 w-full bg-muted rounded mb-4" />
          <div className="h-4 w-1/2 bg-muted rounded mb-6" />
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-5/6 bg-muted rounded mb-2" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">Template {index}</h3>
        <p className="text-sm text-muted-foreground">Professional and clean design</p>
      </div>
    </div>
  );
}
