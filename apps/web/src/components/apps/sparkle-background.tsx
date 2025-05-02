import { Sun, Circle, Plus, Heart, Loader } from 'lucide-react';

const icons = [Sun, Plus, Plus, Plus, Circle, Loader];

const Sparkle = ({
  style,
  delay,
  Icon,
  className = '',
}: {
  style: React.CSSProperties;
  delay?: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}) => (
  <Icon
    className={`absolute text-primary opacity-0 animate-sparkle ${className}`}
    style={{ ...style, animationDelay: `${delay}s` }}
  />
);

export function SparkleBackground() {
  const sparkles = Array.from({ length: 100 }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const Icon = icons[Math.floor(Math.random() * icons.length)];

    const depth = Math.random();
    const blur = depth < 0.2 ? 'blur-xs' : '';
    const opacity = depth < 0.3 ? 'opacity-30' : depth < 0.6 ? 'opacity-60' : 'opacity-100';
    const scale = 0.5 + depth * 0.5;
    const rotate = Math.random() < 0.3 ? 'animate-slow-spin' : ''; // 30% 확률로 회전

    return (
      <Sparkle
        key={i}
        Icon={Icon}
        className={`${blur} ${opacity} ${rotate}`}
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `scale(${scale})`,
          zIndex: Math.floor(depth * 10),
        }}
        delay={delay}
      />
    );
  });

  return <div className="absolute inset-0 pointer-events-none">{sparkles}</div>;
}
