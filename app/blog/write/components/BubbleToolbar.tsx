'use client';

import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import LinkPopover from './LinkPopover';

interface BubbleToolbarProps {
  editor: Editor;
}

function Btn({
  onClick, active, title, children,
}: {
  onClick: () => void; active?: boolean; title?: string; children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
        active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
      }`}
    >
      {children}
    </button>
  );
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
  const [showLink, setShowLink] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const applyLink = (url: string) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setShowLink(false);
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ from, to }) => from !== to && !editor.isActive('image')}
    >
      {showLink ? (
        <LinkPopover onSubmit={applyLink} onClose={() => setShowLink(false)} />
      ) : (
        <div className="flex items-center gap-0.5 bg-white border border-neutral-100 rounded-lg shadow-lg p-1">
          {/* Always visible */}
          <Btn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
            <strong>B</strong>
          </Btn>
          <Btn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
            <em>I</em>
          </Btn>
          <Btn active={editor.isActive('link')} onClick={() => setShowLink(true)} title="Link">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Btn>
          <Btn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">
            <code style={{ fontSize: 11 }}>`</code>
          </Btn>

          {/* Desktop extras */}
          <span className="hidden sm:flex items-center gap-0.5">
            <div className="w-px h-4 bg-neutral-100 mx-0.5" />
            <Btn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
              <span style={{ textDecoration: 'underline', fontSize: 13 }}>U</span>
            </Btn>
            <Btn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
              <span style={{ textDecoration: 'line-through', fontSize: 13 }}>S</span>
            </Btn>
            <Btn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="10" width="12" height="3" rx="1" fill="currentColor" opacity="0.3" />
                <path d="M5 10L8 3l3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 7.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Btn>
            <div className="w-px h-4 bg-neutral-100 mx-0.5" />
            <Btn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Btn>
            <Btn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Btn>
            <Btn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M6 8h8M4 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Btn>
          </span>

          {/* Mobile more button */}
          <button
            className="sm:hidden w-8 h-8 flex items-center justify-center rounded text-neutral-400 hover:text-neutral-700 text-xs"
            onMouseDown={(e) => { e.preventDefault(); setShowMore(!showMore); }}
          >
            •••
          </button>
        </div>
      )}
    </BubbleMenu>
  );
}
