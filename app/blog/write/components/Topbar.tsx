'use client';

import Link from 'next/link';
import { SaveStatus } from '../types/blog';

interface TopbarProps {
  saveStatus: SaveStatus;
  savedTime?: string;
  onPreview: () => void;
  onPublish: () => void;
  isPreviewing: boolean;
}

export default function Topbar({ saveStatus, savedTime, onPreview, onPublish, isPreviewing }: TopbarProps) {
  const dot =
    saveStatus === 'saved'
      ? 'bg-green-400'
      : saveStatus === 'saving'
      ? 'bg-yellow-400 animate-pulse'
      : 'bg-neutral-300';

  const label =
    saveStatus === 'saved'
      ? savedTime ? `Saved at ${savedTime}` : 'Saved'
      : saveStatus === 'saving'
      ? 'Saving...'
      : 'Unsaved';

  return (
    <header
      style={{ height: 52, borderBottom: '1px solid #e5e5e5' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-5"
    >
      {/* Left */}
      <Link
        href="/blog"
        className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 transition-colors"
        style={{ fontSize: 13 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Blog
      </Link>

      {/* Center */}
      <div className="flex items-center gap-2" style={{ fontSize: 13 }}>
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-neutral-400">{label}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPreview}
          style={{ fontSize: 13 }}
          className="px-3 py-1.5 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          {isPreviewing ? '← Edit' : 'Preview'}
        </button>
        <button
          onClick={onPublish}
          style={{ fontSize: 13 }}
          className="px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-colors font-medium"
        >
          Publish
        </button>
      </div>
    </header>
  );
}
