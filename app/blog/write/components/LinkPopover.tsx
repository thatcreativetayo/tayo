'use client';

import { useState } from 'react';

interface LinkPopoverProps {
  onSubmit: (url: string) => void;
  onClose: () => void;
}

export default function LinkPopover({ onSubmit, onClose }: LinkPopoverProps) {
  const [val, setVal] = useState('');

  const submit = () => {
    const url = val.trim();
    if (!url) return;
    onSubmit(url.startsWith('http') ? url : `https://${url}`);
  };

  return (
    <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg shadow-lg px-3 py-2">
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); submit(); }
          if (e.key === 'Escape') onClose();
        }}
        placeholder="Paste a URL..."
        className="text-sm outline-none border-none bg-transparent w-52 text-neutral-800 placeholder-neutral-300"
      />
      <button
        onMouseDown={(e) => { e.preventDefault(); submit(); }}
        className="text-xs font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
      >
        Apply
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); onClose(); }}
        className="text-neutral-300 hover:text-neutral-500 transition-colors text-base leading-none"
      >
        ×
      </button>
    </div>
  );
}
