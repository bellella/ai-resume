'use client';

import {
  FONT_FAMILY,
  FONT_SIZES,
  SECTION_SPACING,
  TEMPLATE_COLORS,
  TemplateFontFamily,
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
import { Check } from 'lucide-react';
import React from 'react';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { useShallow } from 'zustand/react/shallow';

const StyleSettings: React.FC = () => {
  const [templateOptions, setTemplateOptions] = useResumeEditorStore(
    useShallow((state) => [state.templateOptions, state.setTemplateOptions])
  );

  const updateStyle = (next: Partial<typeof templateOptions>) => {
    const updated = { ...templateOptions, ...next };
    setTemplateOptions(updated);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* colors */}
      <div className="pt-6 flex flex-wrap gap-2">
        {Object.values(TEMPLATE_COLORS).map((c) => (
          <div
            key={c.value}
            className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: `rgb(${c.value})`,
            }}
            onClick={() => updateStyle({ color: c.name })}
          >
            {templateOptions.color === c.name && <Check className="text-white w-4 h-4" />}
          </div>
        ))}
      </div>

      {/* font family */}
      <div>
        <StyleLabel>Font Style</StyleLabel>
        <Select
          value={templateOptions.fontFamily}
          onValueChange={(value) => updateStyle({ fontFamily: value as TemplateFontFamily })}
        >
          <SelectTrigger>
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

      {/* font size slider */}
      <div>
        <StyleLabel>Font Size: {templateOptions.fontSize}px</StyleLabel>
        <Slider
          min={FONT_SIZES.min}
          max={FONT_SIZES.max}
          step={FONT_SIZES.step}
          value={[templateOptions.fontSize]}
          onValueChange={(e) => updateStyle({ fontSize: e[0] })}
        />
      </div>

      {/* section spacing slider */}
      <div>
        <StyleLabel>Section Spacing: {templateOptions.sectionSpacing}px</StyleLabel>
        <Slider
          min={SECTION_SPACING.min}
          max={SECTION_SPACING.max}
          step={SECTION_SPACING.step}
          value={[templateOptions.sectionSpacing]}
          onValueChange={(e) => updateStyle({ sectionSpacing: e[0] })}
        />
      </div>
    </div>
  );
};

const StyleLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Label className="pb-3 block">{children}</Label>
);

export default StyleSettings;
