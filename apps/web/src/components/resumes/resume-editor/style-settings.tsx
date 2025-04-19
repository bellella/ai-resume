'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
interface StyleSettingsProps {
  onStyleChange: (style: {
    fontFamily: string;
    fontSize: number;
    sectionSpacing: number;
    color: string;
  }) => void;
}

const fontStyles = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
];

const colorOptions = [
  { value: '#ef4444', label: 'Red' },       // red-500
  { value: '#f97316', label: 'Orange' },    // orange-500
  { value: '#eab308', label: 'Yellow' },    // yellow-500
  { value: '#22c55e', label: 'Green' },     // green-500
  { value: '#3b82f6', label: 'Blue' },      // blue-500
];

const StyleSettings: React.FC<StyleSettingsProps> = ({ onStyleChange }) => {
  const [fontFamily, setFontFamily] = useState(fontStyles[0].value);
  const [fontSize, setFontSize] = useState(16);
  const [sectionSpacing, setSectionSpacing] = useState(10);
  const [color, setColor] = useState(colorOptions[0].value);

  useEffect(() => {
    onStyleChange({
      fontFamily,
      fontSize,
      sectionSpacing,
      color,
    });
  }, [fontFamily, fontSize, sectionSpacing, color, onStyleChange]);

  return (
    <div className="flex flex-col gap-10">
      <div className="pt-6 flex gap-2">
        {colorOptions.map((c) => (
          <div
            key={c.value}
            className="w-8 h-8 rounded-full cursor-pointer border"
            style={{
              backgroundColor: c.value,
              border: color === c.value ? '2px solid black' : '1px solid #ccc',
            }}
            onClick={() => setColor(c.value)}
          />
        ))}
      </div>

      <div>
        <StyleLabel>Font Style</StyleLabel>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fontStyles.map((fs) => (
                <SelectItem key={fs.value} value={fs.value}>
                  {fs.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <StyleLabel>Font Size: {fontSize}px</StyleLabel>
        <Slider
          min={8}
          max={24}
          defaultValue={[fontSize]}
          onValueChange={(e) => setFontSize(e[0])}
        />
      </div>

      <div>
        <StyleLabel>Section Spacing: {sectionSpacing}px</StyleLabel>
        <Slider
          min={4}
          max={32}
          defaultValue={[sectionSpacing]}
          onValueChange={(e) => setSectionSpacing(e[0])}
        />
      </div>
    </div>
  );
};

const StyleLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Label className="pb-3 block">{children}</Label>
);

export default StyleSettings;
