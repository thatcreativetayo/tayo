'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { motion } from 'framer-motion';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = 'Tell your story...' }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      <motion.div 
        className="sticky top-0 z-10 bg-white border-b border-base/10 py-3 px-4 flex gap-2 flex-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('bold') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold italic transition-all ${
            editor.isActive('italic') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('heading', { level: 1 }) ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('heading', { level: 2 }) ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('bulletList') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('orderedList') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('blockquote') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          &quot;
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
            editor.isActive('codeBlock') ? 'bg-base text-white' : 'bg-base/5 text-base hover:bg-base/10'
          }`}
        >
          &lt;/&gt;
        </button>
      </motion.div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
