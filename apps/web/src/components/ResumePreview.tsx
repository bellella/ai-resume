import { Card, CardContent } from '@/components/ui/card';
import { ResumeJson } from '@ai-resume/types';
import DefaultTemplate from '@/components/templates/default';
import ModernTemplate from '@/components/templates/modern';

interface StyleVars {
  color: string;
  fontSize: number;
  sectionSpacing: number;
  fontFamily: string;
}

interface ResumePreviewProps {
  formData: ResumeJson;
  selectedTemplateId: string;
  styleVars: StyleVars;
}

const templates = [
  { id: 'default', name: 'Default Template', component: DefaultTemplate },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate },
];

export default function ResumePreview({
  formData,
  selectedTemplateId,
  styleVars,
}: ResumePreviewProps) {
  const SelectedTemplateComponent = templates.find((t) => t.id === selectedTemplateId)?.component;

  const cssVars = `
    #resume-preview {
      --main-color: ${styleVars.color};
      --base-font-size: ${styleVars.fontSize}px;
      --section-spacing: ${styleVars.sectionSpacing}px;
      font-family: ${styleVars.fontFamily};
    }
  `;

  return (
    <Card className="aspect-a4">
      <CardContent className="p-4">
        <div id="resume-preview" className="resume-container" style={{
          ['--main-color' as any]: styleVars.color,
          ['--base-font-size' as any]: `${styleVars.fontSize}px`,
          ['--section-spacing' as any]: `${styleVars.sectionSpacing}px`,
          fontFamily: styleVars.fontFamily,
        }}>
          {formData && SelectedTemplateComponent ? (
            <SelectedTemplateComponent data={formData} />
          ) : (
            <div className="text-muted-foreground">Select a template to preview</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
