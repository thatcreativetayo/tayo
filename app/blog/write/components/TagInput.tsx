'use client';

import { useRef, useState } from 'react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ tags, onChange }: TagInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/,/g, '');
    if (!tag || tags.includes(tag) || tags.length >= 5) return;
    onChange([...tags, tag]);
    setInput('');
  };

  const removeTag = (t: string) => onChange(tags.filter((x) => x !== t));

  return (
    <div
      className="flex flex-wrap items-center gap-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full"
        >
          {tag}
          <button
            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
            className="text-neutral-400 hover:text-neutral-700 leading-none ml-0.5"
          >
            ×
          </button>
        </span>
      ))}

      {tags.length >= 5 ? (
        <span className="text-xs text-neutral-400">5/5</span>
      ) : (
        <input
          ref={inputRef}
          value={input}
          placeholder={tags.length === 0 ? 'Add tags...' : ''}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(input);
            }
            if (e.key === 'Backspace' && input === '' && tags.length > 0) {
              onChange(tags.slice(0, -1));
            }
          }}
          onBlur={() => { if (input.trim()) addTag(input); }}
          className="bg-transparent outline-none border-none text-xs text-neutral-600 placeholder-neutral-300 min-w-[80px]"
        />
      )}
    </div>
  );
}
