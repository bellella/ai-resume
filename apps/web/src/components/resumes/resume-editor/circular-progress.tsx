import React from 'react';

interface CircularProgressProps {
  value: number; // 0 ~ 100
  size?: number; // px
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 80,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-semibold text-sm">
        {value}
      </div>
    </div>
  );
};
