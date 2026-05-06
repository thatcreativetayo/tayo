'use client';

import { useEffect, useState } from 'react';
import { SavedDraft } from '../types/blog';

const DRAFT_KEY = 'blog-draft';

export function useDraftRestore() {
  const [pendingDraft, setPendingDraft] = useState<SavedDraft | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed: SavedDraft = JSON.parse(raw);
        setPendingDraft(parsed);
      }
    } catch {
      // ignore corrupt data
    }
    setChecked(true);
  }, []);

  const dismiss = () => {
    localStorage.removeItem(DRAFT_KEY);
    setPendingDraft(null);
  };

  const restore = () => {
    setPendingDraft(null);
    // caller uses the returned draft
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'earlier';
    }
  };

  return { pendingDraft, checked, dismiss, restore, formatTime };
}
