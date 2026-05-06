'use client';

import { BlogPostDraft } from '../types/blog';

interface PublishModalProps {
  draft: BlogPostDraft;
  wordCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PublishModal({ draft, wordCount, onConfirm, onCancel }: PublishModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
        style={{ transition: 'transform 300ms ease', transform: 'translateY(0)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-neutral-900 mb-4">Ready to publish?</h3>

        {/* Summary */}
        <div className="space-y-3 mb-6">
          {draft.coverImage && (
            <img src={draft.coverImage} alt="" className="w-full h-28 object-cover rounded-lg" />
          )}
          <p className="text-sm font-semibold text-neutral-900 leading-snug">
            {draft.title || <span className="text-neutral-300 italic">No title</span>}
          </p>
          {draft.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {draft.tags.map((t) => (
                <span key={t} className="bg-neutral-100 text-neutral-600 text-xs px-2.5 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-neutral-400">{wordCount.toLocaleString()} words · {Math.ceil(wordCount / 200)} min read</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Publish post
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
