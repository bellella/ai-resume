'use client';

import {
  FONT_FAMILY,
  FONT_SIZES,
  SECTION_SPACING,
  StyleVars,
  Template,
  TEMPLATE_COLORS,
  TemplateColor,
} from '@/components/templates/templates';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { TemplateJson } from '@ai-resume/types';
import { Check } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
interface StyleSettingsProps {
  template: Template;
  templateJson: TemplateJson;
  onStyleChange: (style: StyleVars) => void;
}

const StyleSettings: React.FC<StyleSettingsProps> = ({ template, onStyleChange, templateJson }) => {
  const didInit = useRef(false);
  const [fontFamily, setFontFamily] = useState(
    templateJson.fontFamily ?? template.styleVars.fontFamily
  );
  const [fontSize, setFontSize] = useState(templateJson.fontSize ?? template.styleVars.fontSize);
  const [sectionSpacing, setSectionSpacing] = useState(
    templateJson.sectionSpacing ?? template.styleVars.sectionSpacing
  );
  const [color, setColor] = useState(templateJson.color ?? template.styleVars.color);

  useEffect(() => {
    if (!didInit.current) {
      setFontFamily(templateJson.fontFamily ?? template.styleVars.fontFamily);
      setFontSize(templateJson.fontSize ?? template.styleVars.fontSize);
      setSectionSpacing(templateJson.sectionSpacing ?? template.styleVars.sectionSpacing);
      setColor(templateJson.color ?? template.styleVars.color);
      didInit.current = true;
    }
  }, [template]);

  useEffect(() => {
    onStyleChange({
      fontFamily,
      fontSize,
      sectionSpacing,
      color: color as TemplateColor,
    });
  }, [fontFamily, fontSize, sectionSpacing, color, onStyleChange]);

  return (
    <div className="flex flex-col gap-10">
      <div className="pt-6 flex gap-2">
        {Object.values(TEMPLATE_COLORS).map((c) => (
          <div
            key={c.value}
            className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: `rgb(${c.value})`,
            }}
            onClick={() => setColor(c.name)}
          >
            {color === c.name && <Check className="text-white w-4 h-4" />}
          </div>
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
              {FONT_FAMILY.map((fs) => (
                <SelectItem key={fs.value} value={fs.value}>
                  {fs.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <StyleLabel>Font Size: {fontSize}px</StyleLabel>
        <Slider
          min={FONT_SIZES.min}
          max={FONT_SIZES.max}
          step={FONT_SIZES.step}
          defaultValue={[fontSize]}
          onValueChange={(e) => setFontSize(e[0])}
        />
      </div>

      <div>
        <StyleLabel>Section Spacing: {sectionSpacing}px</StyleLabel>
        <Slider
          min={SECTION_SPACING.min}
          max={SECTION_SPACING.max}
          step={SECTION_SPACING.step}
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
