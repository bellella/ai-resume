'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export function LinksSection() {
  const form = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'links',
    keyName: 'id',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
        <CardDescription>Add personal or portfolio links. You can reorder them.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              <SortableLinkItem key={field.id} id={field.id} index={index} remove={remove} />
            ))}
          </SortableContext>
        </DndContext>

        <Button type="button" variant="secondary" onClick={() => append({ label: '', url: '' })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </CardContent>
    </Card>
  );
}

type SortableLinkItemProps = {
  id: string;
  index: number;
  remove: (index: number) => void;
};

function SortableLinkItem({ id, index, remove }: SortableLinkItemProps) {
  const { control } = useFormContext();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-2 border border-border rounded-md"
    >
      <button type="button" {...attributes} {...listeners} className="cursor-grab text-gray-400">
        <GripVertical className="w-5 h-5" />
      </button>

      <FormField
        control={control}
        name={`links.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input placeholder="e.g. GitHub" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`links.${index}.url`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input placeholder="https://..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="ghost"
        onClick={() => remove(index)}
        className="text-red-500 self-start mt-7"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
