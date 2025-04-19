import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import templates from '../../templates/templates';
import { ScrollArea } from '@/components/ui/scroll-area';
interface TemplateListProps {
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({ selectedTemplateId, setSelectedTemplateId }) => {
  return (
    <ScrollArea className="h-[600px]">
      <div className="pr-5 space-y-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`aspect-square overflow-hidden cursor-pointer hover:border-primary transition-colors ${selectedTemplateId === template.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedTemplateId(template.id)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TemplateList; 