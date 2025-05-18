import TEMPLATES from '@/components/templates/templates';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import React from 'react';

const TemplateList: React.FC = () => {
  const templates = Object.values(TEMPLATES);
  const { templateId, changeTemplate } = useResumeEditorStore();
  return (
    <ScrollArea className="h-[calc(var(--content-min-height)-180px)]">
      <div className="grid md:grid-cols-2 gap-3 pr-5">
        {templates.map((template) => (
          <Card
            key={template.name}
            className={`aspect-a4 overflow-hidden cursor-pointer hover:border-primary transition-colors ${templateId === template.id ? 'border-primary' : ''}`}
            onClick={() => changeTemplate(template.id)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <img src={template.thumbnail} alt={template.name} className="w-full h-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TemplateList;
