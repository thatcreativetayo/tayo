'use client';

import { useState } from 'react';

interface VideoInsertModalProps {
  onInsert: (url: string) => void;
  onClose: () => void;
}

export default function VideoInsertModal({ onInsert, onClose }: VideoInsertModalProps) {
  const [url, setUrl] = useState('');

  const submit = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onInsert(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-800">Embed YouTube Video</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 text-lg leading-none">×</button>
        </div>
        <div className="flex gap-2">
          <input
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') onClose(); }}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 text-sm border border-neutral-200 rounded-lg px-3 py-2 outline-none focus:border-neutral-400 placeholder-neutral-300"
          />
          <button
            onClick={submit}
            className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Embed
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">Supports youtube.com and youtu.be links</p>
      </div>
    </div>
  );
}
