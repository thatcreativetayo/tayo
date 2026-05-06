'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useEffect, useRef, useState, useCallback } from 'react';
import BubbleToolbar from './BubbleToolbar';
import SlashMenu from './SlashMenu';
import ImageInsertModal from './ImageInsertModal';
import VideoInsertModal from './VideoInsertModal';

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
  onChange: (html: string, text: string) => void;
  onSaveShortcut: () => void;
  onLinkShortcut: () => void;
}

export default function Editor({ content, onChange, onSaveShortcut, onLinkShortcut }: EditorProps) {
  const [showSlash, setShowSlash] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      ImageExt.configure({ inline: false, allowBase64: true }),
      LinkExt.configure({ openOnClick: false, autolink: true }),
      Typography,
      CharacterCount,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: false }),
      TextStyle,
      Underline,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading…';
          return 'Start writing… (type / for commands)';
        },
        emptyNodeClass: 'is-empty',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
    },
    editorProps: {
      attributes: { class: 'tayo-prose focus:outline-none min-h-[300px]' },
      handleKeyDown: (view, event) => {
        // Cmd/Ctrl+S
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
          event.preventDefault();
          onSaveShortcut();
          return true;
        }
        // Cmd/Ctrl+K
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          onLinkShortcut();
          return true;
        }
        return false;
      },
    },
  });

  // Detect "/" on empty line to show slash menu
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      const { state } = editor;
      const { $from } = state.selection;
      const isEmptyParagraph =
        $from.parent.type.name === 'paragraph' &&
        $from.parent.textContent === '/';
      setShowSlash(isEmptyParagraph);
    };
    editor.on('update', handler);
    return () => { editor.off('update', handler); };
  }, [editor]);

  const insertImage = useCallback((src: string) => {
    editor?.chain().focus().setImage({ src }).run();
    setShowImage(false);
  }, [editor]);

  const insertVideo = useCallback((url: string) => {
    // Parse YouTube URL to get video ID and use iframe
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) {
      const id = match[1];
      editor?.chain().focus().insertContent(
        `<div class="youtube-wrapper"><iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`
      ).run();
    }
    setShowVideo(false);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative">
      <BubbleToolbar editor={editor} />

      {/* Slash command floating menu */}
      <FloatingMenu
        editor={editor}
        shouldShow={() => showSlash}
      >
        <SlashMenu
          editor={editor}
          onImage={() => setShowImage(true)}
          onVideo={() => setShowVideo(true)}
          onClose={() => setShowSlash(false)}
        />
      </FloatingMenu>

      <EditorContent editor={editor} />

      {showImage && (
        <ImageInsertModal onInsert={insertImage} onClose={() => setShowImage(false)} />
      )}
      {showVideo && (
        <VideoInsertModal onInsert={insertVideo} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
}
