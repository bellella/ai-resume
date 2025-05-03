import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TEMPLATES, { TemplateId } from '@/components/templates/templates';

interface TemplateListProps {
  selectedTemplateId: string;
  setSelectedTemplateId: (id: TemplateId) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  selectedTemplateId,
  setSelectedTemplateId,
}) => {
  const templates = Object.values(TEMPLATES);
  return (
    <ScrollArea className="h-[calc(var(--content-min-height)-180px)]">
      <div className="grid md:grid-cols-2 gap-3 pr-5">
        {templates.map((template) => (
          <Card
            key={template.name}
            className={`aspect-a4 overflow-hidden cursor-pointer hover:border-primary transition-colors ${selectedTemplateId === template.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedTemplateId(template.id)}
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
