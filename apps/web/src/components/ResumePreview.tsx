import { Card, CardContent } from '@/components/ui/card';
import { ResumeJson } from '@ai-resume/types';
import { StyleVars, Template, TEMPLATE_COLORS } from './templates/templates';

interface ResumePreviewProps {
  formData: ResumeJson;
  template: Template;
  styleVars: StyleVars;
}

import { useEffect, useRef, useState } from 'react';

export default function ResumePreview({ formData, template, styleVars }: ResumePreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const SelectedTemplateComponent = template.component;

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const wrapper = wrapperRef.current;
        const availableWidth = wrapper.offsetWidth;
        const availableHeight = wrapper.offsetHeight;

        // A4 = 210mm x 297mm => ratio preserved
        const scaleX = availableWidth / 793.7; // 210mm = ~793.7px at 96dpi
        const scaleY = availableHeight / 1122.5; // 297mm = ~1122.5px at 96dpi

        setScale(Math.min(scaleX, scaleY));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <Card>
      <CardContent className="p-0">
        <div
          ref={wrapperRef}
          className="relative w-full max-h-[90vh] mx-auto aspect-[210/297] bg-white overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{
              width: '793.7px',
              height: '1122.5px',
              transform: `scale(${scale})`,
            }}
          >
            <div id="resume-preview">
              <style>
                {`
                #resume-template {
                  --main-color: ${TEMPLATE_COLORS[styleVars.color].value};
                  --base-font-size: ${styleVars.fontSize}px;
                  --section-spacing: ${styleVars.sectionSpacing}px;
                  font-family: ${styleVars.fontFamily};
                }
              `}
              </style>
              {formData && SelectedTemplateComponent ? (
                <SelectedTemplateComponent data={formData} />
              ) : (
                <div className="text-muted-foreground">Select a template to preview</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
