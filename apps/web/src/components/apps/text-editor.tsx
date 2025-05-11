'use client';

import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import { Bold, Italic, List, Undo2, Redo2 } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, BulletList, ListItem],
    content: value || '<ul><li></li></ul>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[120px] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<ul><li></li></ul>');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md">
      <div className="flex gap-2 border-b px-2 py-1 bg-muted">
        <EditorButton
          icon={Bold}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <EditorButton
          icon={Italic}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <EditorButton
          icon={List}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <EditorButton icon={Undo2} onClick={() => editor.chain().focus().undo().run()} />
        <EditorButton icon={Redo2} onClick={() => editor.chain().focus().redo().run()} />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function EditorButton({
  icon: Icon,
  onClick,
  active,
}: {
  icon: React.ElementType;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-1.5 rounded hover:bg-accent transition-colors',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
