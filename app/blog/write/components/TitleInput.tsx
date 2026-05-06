'use client';

import { useRef, useEffect } from 'react';

interface TitleInputProps {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  shake: boolean;
}

export default function TitleInput({ value, onChange, onEnter, shake }: TitleInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // auto-resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [value]);

  return (
    <div className="relative">
      <textarea
        ref={ref}
        value={value}
        spellCheck
        maxLength={120}
        rows={1}
        placeholder="Post title..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onEnter();
          }
        }}
        className={`w-full resize-none bg-transparent border-none outline-none placeholder-neutral-300 leading-tight ${shake ? 'shake' : ''}`}
        style={{ fontSize: 40, fontWeight: 700, color: '#111', lineHeight: 1.2, overflow: 'hidden' }}
      />
      {shake && (
        <span className="absolute -bottom-5 left-0 text-xs text-red-500">Title is required</span>
      )}
    </div>
  );
}
