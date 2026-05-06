'use client';

import { useRef, useState } from 'react';

interface ImageInsertModalProps {
  onInsert: (src: string) => void;
  onClose: () => void;
}

export default function ImageInsertModal({ onInsert, onClose }: ImageInsertModalProps) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => onInsert(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-800">Insert Image</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 text-lg leading-none">×</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-neutral-100">
          {(['upload', 'url'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {t === 'upload' ? 'Upload' : 'URL'}
            </button>
          ))}
        </div>

        {tab === 'upload' ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file?.type.startsWith('image/')) handleFile(file);
            }}
            className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neutral-300 mb-2">
              <path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-xs text-neutral-400">Drop or click to upload</p>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }} />
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && url.trim()) onInsert(url.trim()); }}
              placeholder="https://example.com/image.jpg"
              className="flex-1 text-sm border border-neutral-200 rounded-lg px-3 py-2 outline-none focus:border-neutral-400 placeholder-neutral-300"
            />
            <button
              onClick={() => { if (url.trim()) onInsert(url.trim()); }}
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-700 transition-colors"
            >
              Insert
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
