'use client';

import { useCallback, useReducer, useRef, useState } from 'react';
import { BlogPostDraft, SaveStatus } from './types/blog';
import { useAutosave } from './hooks/useAutosave';
import { useDraftRestore } from './hooks/useDraftRestore';
import Topbar from './components/Topbar';
import CoverUpload from './components/CoverUpload';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import TagInput from './components/TagInput';
import Editor from './components/Editor';
import WordCount from './components/WordCount';
import PublishModal from './components/PublishModal';
import PreviewPanel from './components/PreviewPanel';
import './styles/prose.css';
import { createBlog } from '@/lib/api';

// ── State ──────────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_TITLE'; value: string }
  | { type: 'SET_DESCRIPTION'; value: string }
  | { type: 'SET_BODY'; value: string }
  | { type: 'SET_TAGS'; value: string[] }
  | { type: 'SET_COVER'; value: string | undefined }
  | { type: 'RESTORE'; draft: BlogPostDraft };

const initial: BlogPostDraft = { title: '', description: '', body: '', tags: [], coverImage: undefined };

function reducer(state: BlogPostDraft, action: Action): BlogPostDraft {
  switch (action.type) {
    case 'SET_TITLE': return { ...state, title: action.value };
    case 'SET_DESCRIPTION': return { ...state, description: action.value };
    case 'SET_BODY': return { ...state, body: action.value };
    case 'SET_TAGS': return { ...state, tags: action.value };
    case 'SET_COVER': return { ...state, coverImage: action.value };
    case 'RESTORE': return { ...action.draft };
    default: return state;
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WritePage() {
  const [draft, dispatch] = useReducer(reducer, initial);
  const [plainText, setPlainText] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('unsaved');
  const [savedTime, setSavedTime] = useState<string>();
  const [showPublish, setShowPublish] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [titleShake, setTitleShake] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const descRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  // Autosave
  const { saveNow, clearDraft } = useAutosave(draft, (status, time) => {
    setSaveStatus(status);
    if (time) setSavedTime(time);
  });

  // Draft restore
  const { pendingDraft, checked, dismiss, formatTime } = useDraftRestore();

  const handleRestore = () => {
    if (pendingDraft) dispatch({ type: 'RESTORE', draft: pendingDraft });
    dismiss();
  };

  const handleBodyChange = useCallback((html: string, text: string) => {
    dispatch({ type: 'SET_BODY', value: html });
    setPlainText(text);
  }, []);

  const handleSaveShortcut = useCallback(() => {
    saveNow();
  }, [saveNow]);

  // Link shortcut — bubble menu handles this via BubbleToolbar, but we expose a ref trigger
  const handleLinkShortcut = useCallback(() => {
    // Tiptap's built-in Cmd+K is handled in editor keydown; this is a fallback
  }, []);

  const handlePublish = async () => {
    if (!draft.title.trim()) {
      setTitleShake(true);
      setTimeout(() => setTitleShake(false), 500);
      return;
    }
    setShowPublish(true);
  };

  const confirmPublish = async () => {
    setPublishing(true);
    try {
      await createBlog(
        {
          title: draft.title,
          description: draft.description,
          body: draft.body,
          tags: draft.tags,
          coverImage: draft.coverImage,
        },
      );
      clearDraft();
      setShowPublish(false);
      window.location.href = '/blog';
    } catch (err) {
      alert('Failed to publish. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const wordCount = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-white">
      <Topbar
        saveStatus={saveStatus}
        savedTime={savedTime}
        onPreview={() => setShowPreview(!showPreview)}
        onPublish={handlePublish}
        isPreviewing={showPreview}
      />

      {/* Draft restore banner */}
      {checked && pendingDraft && (
        <div className="fixed top-[52px] left-0 right-0 z-40 bg-neutral-50 border-b border-neutral-200 px-5 py-2.5 flex items-center justify-between" style={{ fontSize: 13 }}>
          <span className="text-neutral-600">
            You have an unsaved draft from {formatTime(pendingDraft.savedAt)}.
          </span>
          <div className="flex gap-3">
            <button onClick={handleRestore} className="text-neutral-900 font-medium hover:underline">Restore</button>
            <button onClick={dismiss} className="text-neutral-400 hover:text-neutral-600">Dismiss</button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main
        className="max-w-[720px] mx-auto px-6 py-12 sm:px-4 sm:py-8"
        style={{ paddingTop: checked && pendingDraft ? 108 : 80 }}
      >
        <div className="space-y-6">
          <CoverUpload
            value={draft.coverImage}
            onChange={(v) => dispatch({ type: 'SET_COVER', value: v })}
          />

          <TitleInput
            value={draft.title}
            onChange={(v) => dispatch({ type: 'SET_TITLE', value: v })}
            onEnter={() => (document.querySelector('textarea[placeholder*="description"]') as HTMLTextAreaElement)?.focus()}
            shake={titleShake}
          />

          <DescriptionInput
            value={draft.description}
            onChange={(v) => dispatch({ type: 'SET_DESCRIPTION', value: v })}
            onEnter={() => (document.querySelector('input[placeholder*="tags"]') as HTMLInputElement)?.focus()}
          />

          <TagInput
            tags={draft.tags}
            onChange={(v) => dispatch({ type: 'SET_TAGS', value: v })}
          />

          <div className="border-t border-neutral-100 pt-6">
            <Editor
              content={draft.body}
              onChange={handleBodyChange}
              onSaveShortcut={handleSaveShortcut}
              onLinkShortcut={handleLinkShortcut}
            />
          </div>
        </div>
      </main>

      <WordCount text={plainText} />

      {showPublish && (
        <PublishModal
          draft={draft}
          wordCount={wordCount}
          onConfirm={confirmPublish}
          onCancel={() => setShowPublish(false)}
        />
      )}

      {showPreview && (
        <PreviewPanel draft={draft} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}


