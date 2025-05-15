'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const skillLevels = ['none', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export function SkillsSection() {
  const { control, register, setValue, getValues } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
    keyName: 'id',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          List your skills and proficiency levels. You can reorder them.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              const oldIndex = fields.findIndex((f) => f.id === active.id);
              const newIndex = fields.findIndex((f) => f.id === over?.id);
              if (oldIndex !== -1 && newIndex !== -1) {
                move(oldIndex, newIndex);
              }
            }
          }}
        >
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field, index) => (
              <SortableSkillItem
                key={field.id}
                id={field.id}
                index={index}
                register={register}
                remove={remove}
                getValue={getValues}
                setValue={setValue}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ name: '', level: 'Beginner' })}
        >
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}

type SortableSkillItemProps = {
  id: string;
  index: number;
  register: ReturnType<typeof useFormContext>['register'];
  remove: (index: number) => void;
  getValue: (path: string) => string;
  setValue: (path: string, value: string) => void;
};

function SortableSkillItem({
  id,
  index,
  register,
  remove,
  getValue,
  setValue,
}: SortableSkillItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 rounded-md p-2 border border-border"
    >
      <button type="button" {...attributes} {...listeners} className="cursor-grab text-gray-400">
        <GripVertical className="w-5 h-5" />
      </button>
      <Input placeholder="Skill" {...register(`skills.${index}.name`)} className="flex-1" />
      <Select
        value={getValue(`skills.${index}.level`)}
        onValueChange={(value) => setValue(`skills.${index}.level`, value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          {skillLevels.map((lvl) => (
            <SelectItem key={lvl} value={lvl}>
              {lvl}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="button" variant="ghost" onClick={() => remove(index)} className="text-red-500">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
