'use client';

import { useEffect, useRef } from 'react';
import { BlogPostDraft, SavedDraft, SaveStatus } from '../types/blog';

const DRAFT_KEY = 'blog-draft';
const DEBOUNCE_MS = 1500;

export function useAutosave(
  draft: BlogPostDraft,
  onStatusChange: (status: SaveStatus, time?: string) => void
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onStatusChange('saving');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const saved: SavedDraft = {
        ...draft,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(saved));

      const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      onStatusChange('saved', time);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draft.title, draft.description, draft.body, draft.tags, draft.coverImage]);

  const saveNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const saved: SavedDraft = {
      ...draft,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(saved));
    const time = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    onStatusChange('saved', time);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return { saveNow, clearDraft };
}
