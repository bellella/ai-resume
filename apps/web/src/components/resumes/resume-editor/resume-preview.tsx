import { Card, CardContent } from '@/components/ui/card';
import { ResumeFormValues } from '@/lib/hooks/use-resume-form';
import { TEMPLATE_COLORS } from '../../templates/templates';

import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ResumePreview() {
  const { template, templateOptions } = useResumeEditorStore();
  const { watch } = useFormContext<ResumeFormValues>();
  const resumeJson = watch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const SelectedTemplateComponent = template?.component;

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const wrapper = wrapperRef.current;
        const availableWidth = wrapper.clientWidth;
        const availableHeight = wrapper.clientHeight;

        // A4 = 210mm x 297mm => ratio preserved
        const scaleX = availableWidth / 793.7; // 210mm = ~793.7px at 96dpi
        const scaleY = availableHeight / 1122.5; // 297mm = ~1122.5px at 96dpi

        setScale(scaleX);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-h-[90vh] aspect-a4">
      <div
        className="absolute top-0 left-0 origin-top-left overflow-auto"
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
                  --main-color: ${TEMPLATE_COLORS[templateOptions.color].value};
                  --base-font-size: ${templateOptions.fontSize}px;
                  --section-spacing: ${templateOptions.sectionSpacing}px;
                  font-family: ${templateOptions.fontFamily};
                }
              `}
          </style>
          {resumeJson && SelectedTemplateComponent ? (
            <SelectedTemplateComponent resumeJson={resumeJson} />
          ) : (
            <div className="text-muted-foreground">Select a template to preview</div>
          )}
        </div>
      </div>
    </div>
  );
}
