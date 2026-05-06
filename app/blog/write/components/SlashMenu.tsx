'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';

interface SlashItem {
  icon: string;
  label: string;
  hint: string;
  action: (editor: Editor) => void;
}

const items: SlashItem[] = [
  { icon: 'H1', label: 'Heading 1', hint: '#', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setHeading({ level: 1 }).run() },
  { icon: 'H2', label: 'Heading 2', hint: '##', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setHeading({ level: 2 }).run() },
  { icon: 'H3', label: 'Heading 3', hint: '###', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setHeading({ level: 3 }).run() },
  { icon: '"', label: 'Quote', hint: '>', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setBlockquote().run() },
  { icon: '</>', label: 'Code Block', hint: '```', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setCodeBlock().run() },
  { icon: '—', label: 'Divider', hint: '---', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).setHorizontalRule().run() },
  { icon: '•', label: 'Bullet List', hint: '-', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).toggleBulletList().run() },
  { icon: '1.', label: 'Numbered List', hint: '1.', action: (e) => e.chain().focus().deleteRange({ from: e.state.selection.from - 1, to: e.state.selection.from }).toggleOrderedList().run() },
];

interface SlashMenuProps {
  editor: Editor;
  onImage: () => void;
  onVideo: () => void;
  onClose: () => void;
}

export default function SlashMenu({ editor, onImage, onVideo, onClose }: SlashMenuProps) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const allItems = [
    ...items,
    { icon: '🖼', label: 'Image', hint: 'img', action: () => { onClose(); onImage(); } },
    { icon: '▶', label: 'Video', hint: 'yt', action: () => { onClose(); onVideo(); } },
    { icon: '💡', label: 'Callout', hint: 'note', action: (e: Editor) => {
      const pos = e.state.selection.from;
      e.chain().focus()
        .deleteRange({ from: pos - 1, to: pos })
        .insertContent('<div class="callout"><span class="callout-icon">💡</span><p>Your note here</p></div>')
        .run();
      onClose();
    }},
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % allItems.length); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + allItems.length) % allItems.length); }
      if (e.key === 'Enter') { e.preventDefault(); allItems[active].action(editor); onClose(); }
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, allItems, editor, onClose]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="bg-white border border-neutral-100 rounded-lg shadow-lg py-1 overflow-hidden"
      style={{ width: 280 }}
    >
      {allItems.map((item, i) => (
        <button
          key={item.label}
          onMouseDown={(e) => { e.preventDefault(); item.action(editor); onClose(); }}
          onMouseEnter={() => setActive(i)}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
            i === active ? 'bg-neutral-50' : ''
          }`}
        >
          <span className="w-7 h-7 flex items-center justify-center bg-neutral-100 rounded text-xs font-mono text-neutral-600 flex-shrink-0">
            {item.icon}
          </span>
          <span className="flex-1 text-sm text-neutral-800">{item.label}</span>
          <span className="text-xs text-neutral-300 font-mono">{item.hint}</span>
        </button>
      ))}
    </div>
  );
}
