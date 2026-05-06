'use client';

import { useRef, useEffect } from 'react';

interface DescriptionInputProps {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
}

export default function DescriptionInput({ value, onChange, onEnter }: DescriptionInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      spellCheck
      maxLength={280}
      rows={1}
      placeholder="Write a short description..."
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onEnter();
        }
      }}
      className="w-full resize-none bg-transparent border-none outline-none placeholder-neutral-300"
      style={{ fontSize: 17.6, fontWeight: 400, color: '#555', lineHeight: 1.6, overflow: 'hidden' }}
    />
  );
}
