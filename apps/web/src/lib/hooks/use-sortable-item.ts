import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function useSortableItem(id: string) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return {
    attributes,
    listeners,
    setNodeRef,
    style: {
      transform: CSS.Transform.toString(transform),
      transition,
    },
  };
}
