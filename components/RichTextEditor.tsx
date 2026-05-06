'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { useState, useRef, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  TextBoldFreeIcons,
  TextItalicFreeIcons,
  Link01FreeIcons,
  QuoteDownFreeIcons,
  SourceCodeFreeIcons,
  Image01FreeIcons,
  MinusSignFreeIcons,
  Cancel01FreeIcons,
} from '@hugeicons/core-free-icons';

// ─── Toolbar button ────────────────────────────────────────────────────────────
function ToolBtn({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors text-sm font-medium ${
        active
          ? 'text-[#1a8917]'
          : 'text-[#292929] hover:text-[#1a1a1a]'
      }`}
    >
      {children}
    </button>
  );
}

// ─── Link input popover ────────────────────────────────────────────────────────
function LinkPopover({ onSubmit, onClose }: { onSubmit: (url: string) => void; onClose: () => void }) {
  const [val, setVal] = useState('');
  return (
    <div className="flex items-center gap-2 bg-[#292929] rounded-full px-3 py-1.5 shadow-lg">
      <input
        autoFocus
        className="bg-transparent text-white text-sm outline-none placeholder:text-white/40 w-56"
        placeholder="Paste or type a link…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); onSubmit(val); }
          if (e.key === 'Escape') onClose();
        }}
      />
      <button onMouseDown={(e) => { e.preventDefault(); onSubmit(val); }}
        className="text-white/60 hover:text-white transition-colors">
        <HugeiconsIcon icon={Link01FreeIcons} size={14} />
      </button>
      <button onMouseDown={(e) => { e.preventDefault(); onClose(); }}
        className="text-white/40 hover:text-white/80 transition-colors">
        <HugeiconsIcon icon={Cancel01FreeIcons} size={12} />
      </button>
    </div>
  );
}

// ─── Plus menu ─────────────────────────────────────────────────────────────────
function PlusMenu({
  onImage,
  onDivider,
  onClose,
}: {
  onImage: () => void;
  onDivider: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-1 pl-1">
      <button
        onMouseDown={(e) => { e.preventDefault(); onClose(); }}
        className="w-7 h-7 rounded-full border border-[#b3b3b1] text-[#b3b3b1] hover:border-[#292929] hover:text-[#292929] flex items-center justify-center transition-colors text-base leading-none rotate-45"
        title="Close"
      >
        +
      </button>
      <div className="flex items-center gap-1 ml-1">
        {[
          { icon: Image01FreeIcons, label: 'Image', action: onImage },
          { icon: MinusSignFreeIcons, label: 'Divider', action: onDivider },
        ].map(({ icon, label, action }) => (
          <button
            key={label}
            title={label}
            onMouseDown={(e) => { e.preventDefault(); action(); onClose(); }}
            className="w-9 h-9 rounded-full border border-[#b3b3b1] text-[#b3b3b1] hover:border-[#292929] hover:text-[#292929] flex items-center justify-center transition-colors"
          >
            <HugeiconsIcon icon={icon} size={17} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── RichTextEditor ────────────────────────────────────────────────────────────
interface Props {
  content: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: Props) {
  const [showLink, setShowLink]     = useState(false);
  const [plusOpen, setPlusOpen]     = useState(false);
  const imageInputRef               = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        horizontalRule: false,
        codeBlock: false,
      }),
      Typography,
      HorizontalRule,
      ImageExt.configure({ inline: false, allowBase64: true }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { class: 'editor-link' } }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading…';
          return placeholder ?? 'Tell your story…';
        },
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'medium-editor focus:outline-none',
        spellcheck: 'true',
      },
    },
  });

  const insertImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      editor?.chain().focus().setImage({ src: reader.result as string }).run();
    };
    reader.readAsDataURL(file);
  }, [editor]);

  const applyLink = useCallback((url: string) => {
    if (!url) { editor?.chain().focus().unsetLink().run(); }
    else {
      const href = url.startsWith('http') ? url : `https://${url}`;
      editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    }
    setShowLink(false);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative">
      {/* ── Bubble menu (on text selection) ─────────────────────────────── */}
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor, from, to }) => {
          return from !== to && !editor.isActive('image');
        }}
      >
        {showLink ? (
          <LinkPopover onSubmit={applyLink} onClose={() => setShowLink(false)} />
        ) : (
          <div className="flex items-center gap-0.5 bg-[#292929] rounded-full px-2 py-1.5 shadow-lg">
            <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
              <HugeiconsIcon icon={TextBoldFreeIcons} size={15} color="white" />
            </ToolBtn>
            <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
              <HugeiconsIcon icon={TextItalicFreeIcons} size={15} color="white" />
            </ToolBtn>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <ToolBtn
              active={editor.isActive('heading', { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading"
            >
              <span className="text-white font-bold text-xs tracking-tight">H</span>
            </ToolBtn>
            <ToolBtn
              active={editor.isActive('heading', { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Subheading"
            >
              <span className="text-white/70 font-semibold text-xs tracking-tight">h</span>
            </ToolBtn>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
              <HugeiconsIcon icon={QuoteDownFreeIcons} size={15} color="white" />
            </ToolBtn>
            <ToolBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
              <HugeiconsIcon icon={SourceCodeFreeIcons} size={15} color="white" />
            </ToolBtn>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <ToolBtn active={editor.isActive('link')} onClick={() => setShowLink(true)} title="Link">
              <HugeiconsIcon icon={Link01FreeIcons} size={15} color="white" />
            </ToolBtn>
          </div>
        )}
      </BubbleMenu>

      {/* ── Floating menu (on empty line) ────────────────────────────────── */}
      <FloatingMenu
        editor={editor}
        shouldShow={({ state }) => {
          const { $from } = state.selection;
          const isEmptyBlock = $from.parent.textContent === '' && $from.parent.type.name === 'paragraph';
          return isEmptyBlock;
        }}
      >
        {plusOpen ? (
          <PlusMenu
            onImage={() => imageInputRef.current?.click()}
            onDivider={() => editor.chain().focus().setHorizontalRule().run()}
            onClose={() => setPlusOpen(false)}
          />
        ) : (
          <button
            onMouseDown={(e) => { e.preventDefault(); setPlusOpen(true); }}
            className="w-7 h-7 rounded-full border border-[#b3b3b1] text-[#b3b3b1] hover:border-[#292929] hover:text-[#292929] flex items-center justify-center transition-colors text-base leading-none -translate-x-10"
            title="Insert content"
          >
            +
          </button>
        )}
      </FloatingMenu>

      {/* ── Editor ───────────────────────────────────────────────────────── */}
      <EditorContent editor={editor} />

      {/* ── Hidden image input ───────────────────────────────────────────── */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) insertImage(file);
          e.target.value = '';
        }}
      />

      {/* ── Editor styles ─────────────────────────────────────────────────── */}
      <style>{`
        .medium-editor {
          font-family: charter, Georgia, Cambria, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.78;
          color: #292929;
          min-height: 300px;
          caret-color: #292929;
        }
        .medium-editor p { margin-bottom: 1.4em; }
        .medium-editor p:last-child { margin-bottom: 0; }
        .medium-editor h2 {
          font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.24;
          letter-spacing: -0.3px;
          color: #1a1a1a;
          margin: 2em 0 0.4em;
        }
        .medium-editor h3 {
          font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
          color: #1a1a1a;
          margin: 1.6em 0 0.3em;
        }
        .medium-editor blockquote {
          border-left: 3px solid #292929;
          margin: 2em 0;
          padding-left: 23px;
          font-style: italic;
          font-size: 21px;
          color: #6b6b6b;
        }
        .medium-editor code {
          font-family: "Lucida Console", "Courier New", monospace;
          font-size: 0.85em;
          background: #f2f2f2;
          padding: 0.15em 0.4em;
          border-radius: 3px;
          color: #292929;
        }
        .medium-editor pre {
          background: #f8f8f8;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          padding: 1.2em 1.4em;
          overflow-x: auto;
          margin: 1.6em 0;
        }
        .medium-editor pre code {
          background: none;
          padding: 0;
          font-size: 14px;
          line-height: 1.6;
        }
        .medium-editor hr {
          border: none;
          text-align: center;
          margin: 2.5em 0;
          color: #b3b3b1;
          font-size: 24px;
          letter-spacing: 0.5em;
        }
        .medium-editor hr::after { content: "···"; }
        .medium-editor img {
          max-width: 100%;
          display: block;
          margin: 2em auto;
          border-radius: 2px;
        }
        .editor-link {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .medium-editor .is-editor-empty:first-child::before,
        .medium-editor .is-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #b3b3b1;
          pointer-events: none;
          height: 0;
        }
        .medium-editor strong { font-weight: 700; }
        .medium-editor em { font-style: italic; }
        .medium-editor ul, .medium-editor ol {
          padding-left: 1.6em;
          margin-bottom: 1.4em;
        }
        .medium-editor li { margin-bottom: 0.4em; }
      `}</style>
    </div>
  );
}
