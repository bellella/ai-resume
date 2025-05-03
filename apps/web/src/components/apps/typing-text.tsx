'use client';

import { useEffect, useState } from 'react';

export function TypingText({ text, speed = 80 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="relative break-words">
      <h1 className="text-transparent text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
        {text}|
      </h1>
      <h1 className="absolute top-0 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
        {displayedText}|
      </h1>
    </div>
  );
}
