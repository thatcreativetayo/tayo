'use client';

import { useEffect, useState } from 'react';
import { BlogPostDraft } from '../types/blog';

interface PreviewPanelProps {
  draft: BlogPostDraft;
  onClose: () => void;
}

export default function PreviewPanel({ draft, onClose }: PreviewPanelProps) {
  const [clean, setClean] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Dynamically import DOMPurify (browser only)
    import('dompurify').then((mod) => {
      const DOMPurify = mod.default;
      setClean(DOMPurify.sanitize(draft.body));
    });
    // Slide in
    requestAnimationFrame(() => setVisible(true));
  }, [draft.body]);

  return (
    <div
      className="fixed inset-0 z-40 bg-white overflow-y-auto"
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms ease',
      }}
    >
      <div className="max-w-[720px] mx-auto px-6 py-12 pt-20">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 transition-colors mb-10 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit
        </button>

        {draft.coverImage && (
          <img src={draft.coverImage} alt="" className="w-full rounded-xl object-cover mb-8" style={{ height: 280 }} />
        )}

        <h1 className="text-4xl font-bold text-neutral-900 mb-3 leading-tight" style={{ fontWeight: 700 }}>
          {draft.title || <span className="text-neutral-300">No title</span>}
        </h1>

        {draft.description && (
          <p className="text-lg text-neutral-500 mb-6">{draft.description}</p>
        )}

        {draft.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {draft.tags.map((t) => (
              <span key={t} className="bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        )}

        <hr className="border-neutral-100 mb-8" />

        <div
          className="tayo-prose"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </div>
    </div>
  );
}
